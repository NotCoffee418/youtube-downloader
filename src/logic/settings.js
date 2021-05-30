import { Database } from './database'

export class Settings {
    static cachedSettings = null;

    static get(setting_name) {
        return this.has_key(setting_name) ?
            this.get_all()[setting_name] : null;
    }

    static get_all(useCache = true) {
        // Get cached if possible
        if (useCache && this.cachedSettings != null) {
            return this.cachedSettings;
        }
        // Get from database instead
        else {
            var client = new Database();
            client.open();
            var settingsData = client.db.prepare(
                "SELECT * FROM settings").all();
            client.close();

            // Convert to dictionary
            var settingsDict = {};
            settingsData.forEach(e => {
                settingsDict[e.setting_name] = e.setting_value;
            });

            // Store in cache & return
            this.cachedSettings = settingsDict;
            return settingsDict;
        }
    }

    static set(setting_name, setting_value) {
        // determine if setting already exists
        var isExistingSetting = has_key(setting_name);

        var client = new Database();
        client.open();
        if (isExistingSetting) {    // Update if already exists
            client.db.prepare("UPDATE settings SET setting_value = ? WHERE setting_name = ?")
                .run(setting_value, setting_name);
        }
        else {  // Insert if new
            client.db.prepare("INSERT INTO settings (setting_name, setting_value) VALUES (?, ?)")
                .run(setting_name, setting_value);
        }
        client.close();

        // Reset cached settings
        this.cachedSettings = null;
    }

    static has_key(setting_name) {
        var client = new Database();
        client.open();
        var keyCount = client.db.prepare(
            "SELECT COUNT(*) as count FROM settings WHERE setting_name = ?").get(setting_name)["count"];
        client.close();
        return keyCount == 1;
    }

}