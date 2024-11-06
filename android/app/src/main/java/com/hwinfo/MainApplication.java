@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    packages.add(new BatteryHealthPackage()); // Add this line
    return packages;
}
