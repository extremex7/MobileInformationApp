import NetworkInfo from "./NetworkInfo";

export default class SpeedTest {
  constructor(updateCallback, finishCallback) {
    this.updateCallback = updateCallback;
    this.finishCallback = finishCallback;
    this.isRunning = false;
    this.networkInfo = null;
    this.location = null;
  }

  async startScan() {
    this.isRunning = true;

    await this.updateStatus("Detecting network...");
    this.networkInfo = await NetworkInfo.getNetworkDetails();
    this.location = await NetworkInfo.getLocation();

    this.updateCallback({
      provider: this.networkInfo.provider,
      location: this.location
        ? `${this.location.city}, ${this.location.country}`
        : "Unknown",
    });

    await this.updateStatus("Testing ping...");
    const ping = await this.measurePing();

    await this.updateStatus("Testing download...");
    const downloadSpeed = await this.measureDownload();

    await this.updateStatus("Testing upload...");
    const uploadSpeed = await this.measureUpload();

    this.isRunning = false;
    this.finishCallback({
      ping,
      download: downloadSpeed,
      upload: uploadSpeed,
      provider: this.networkInfo.provider,
      location: this.location
        ? `${this.location.city}, ${this.location.country}`
        : "Unknown",
    });
  }

  async measurePing() {
    const start = Date.now();
    try {
      await fetch("https://www.google.com/generate_204");
      const ping = Date.now() - start;
      this.updateCallback({ ping });
      return ping;
    } catch (error) {
      return 0;
    }
  }

  async measureDownload() {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const startTime = Date.now();
      let loadedBytes = 0;
      let speedSamples = [];
      let isSpeedStable = false;
      const SAMPLE_SIZE = 5;
      const STABILITY_THRESHOLD = 0.1;

      const testFile = `https://speed.cloudflare.com/1000mb.bin?cache_bust=${Date.now()}`;

      const calculateAverageSpeed = (samples) => {
        if (samples.length === 0) return 0;
        return samples.reduce((a, b) => a + b, 0) / samples.length;
      };

      const sampleInterval = setInterval(() => {
        if (!this.isRunning) {
          clearInterval(sampleInterval);
          resolve(0);
          return;
        }

        const duration = (Date.now() - startTime) / 1000;
        const currentSpeed = (loadedBytes * 8) / (1000000 * duration);

        if (currentSpeed > 0) {
          speedSamples.push(currentSpeed);
          this.updateCallback({
            speed: currentSpeed,
            speedoValue: Math.min(currentSpeed, 100),
            download: currentSpeed.toFixed(2),
          });
        }

        if (speedSamples.length >= SAMPLE_SIZE) {
          const recentSamples = speedSamples.slice(-SAMPLE_SIZE);
          const avgSpeed = calculateAverageSpeed(recentSamples);
          const variation = recentSamples.every(
            (speed) =>
              Math.abs(speed - avgSpeed) / avgSpeed < STABILITY_THRESHOLD
          );

          if (variation) {
            isSpeedStable = true;
            clearInterval(sampleInterval);
            xhr.abort();
            resolve(avgSpeed);
          }
        }
      }, 200);

      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          loadedBytes = event.loaded;
        }
      };

      xhr.onload = () => {
        if (!isSpeedStable) {
          clearInterval(sampleInterval);
          const avgSpeed = calculateAverageSpeed(speedSamples);
          resolve(avgSpeed);
        }
      };

      xhr.onerror = () => {
        clearInterval(sampleInterval);
        resolve(0);
      };

      xhr.open("GET", testFile, true);
      xhr.send();
    });
  }

  async measureUpload() {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const startTime = Date.now();
      const dataSize = 20 * 1024 * 1024; // 20MB of data
      const data = new ArrayBuffer(dataSize);
      let uploadedBytes = 0;
      let speedSamples = [];

      const sampleInterval = setInterval(() => {
        if (!this.isRunning) {
          clearInterval(sampleInterval);
          resolve(0);
          return;
        }

        const duration = (Date.now() - startTime) / 1000;
        const currentSpeed = (uploadedBytes * 8) / (1000000 * duration);

        if (currentSpeed > 0) {
          speedSamples.push(currentSpeed);
          this.updateCallback({
            speed: currentSpeed,
            speedoValue: Math.min(currentSpeed, 100),
            upload: currentSpeed.toFixed(2),
          });
        }
      }, 200);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          uploadedBytes = event.loaded;
        }
      };

      xhr.onload = () => {
        clearInterval(sampleInterval);
        const avgSpeed =
          speedSamples.length > 0
            ? speedSamples.reduce((a, b) => a + b, 0) / speedSamples.length
            : 0;
        resolve(avgSpeed);
      };

      xhr.onerror = () => {
        clearInterval(sampleInterval);
        resolve(0);
      };

      xhr.open("POST", "https://speed.cloudflare.com/upload", true);
      xhr.send(data);
    });
  }

  async updateStatus(status) {
    this.updateCallback({ status });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  stopScan() {
    this.isRunning = false;
  }
}
