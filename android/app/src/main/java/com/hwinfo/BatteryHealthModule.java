package com.hwinfo;

import android.content.Context;
import android.os.BatteryManager;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class BatteryHealthModule extends ReactContextBaseJavaModule {
    private final BatteryManager batteryManager;

    public BatteryHealthModule(Context context) {
        batteryManager = (BatteryManager) context.getSystemService(Context.BATTERY_SERVICE);
    }

    @Override
    public String getName() {
        return "BatteryHealth";
    }

    @ReactMethod
    public void getBatteryHealth(Promise promise) {
        try {
            WritableMap batteryData = Arguments.createMap();
            
            int capacity = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
            long chargeCounter = batteryManager.getLongProperty(BatteryManager.BATTERY_PROPERTY_CHARGE_COUNTER);
            int status = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_STATUS);
            
            batteryData.putInt("capacity", capacity);
            batteryData.putDouble("chargeCounter", chargeCounter);
            batteryData.putInt("status", status);
            
            promise.resolve(batteryData);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
