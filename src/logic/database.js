import { Helpers } from './helpers'

const os = require('os');
const path = require('path');

export class Database {
    constructor() {
        if (!Database.#is_installed) {
            this.open();
            this.install_database();
            this.close();
        }
    }

    // Properties
    static #is_installed = false;
    db = null;

    open() {
        // Open DB if not open
        if (this.db == null || !this.db.open) {
            this.db = require('better-sqlite3')(Helpers.get_working_dir('', 'client.db'));
        }
    }

    close() {
        if (this.db != null && this.db.open)
            this.db.close();
    }

    install_database() {
        // skip if already checked version this session
        if (Database.#is_installed)
            return;

        // Mark database as installed for the rest of the session
        Database.#is_installed = true;
        console.log("Installing database...");

        // Checks if database has any version installed
        var installed_version = 0;
        var has_done_first_run = this.db.prepare(
            "SELECT COUNT(name) as count FROM sqlite_master WHERE type='table' AND name='settings'")
            .get()['count'];

        // Grab installed_version if any
        if (has_done_first_run == 1)
            installed_version = this.db.prepare(
                "SELECT setting_value FROM settings WHERE setting_name = ?")
                .get("db_version")['setting_value'];

        // Install database updates
        // install v1
        if (installed_version == 0) {
            // Create db_version table
            this.db.prepare(`CREATE TABLE settings (
                setting_name TEXT PRIMARY KEY,                
                setting_value TEXT NOT NULL
            );`).run();
            this.db.prepare("INSERT INTO settings (setting_name, setting_value) VALUES (?, ?)")
                .run("db_version", 0);


            // Create download_history table
            this.db.prepare(
                `CREATE TABLE download_history (
                id INTEGER PRIMARY KEY,
                source_url TEXT NOT NULL,
                save_path TEXT,
                title TEXT NOT NULL,
                duration_seconds INTEGER NOT NULL,
                filesize INTEGER NOT NULL,
                file_format TEXT NOT NULL,
                is_complete INTEGER NOT NULL DEFAULT 0
             );`).run();

            // report version updated
            this.update_database_version(1);
        }
        // install v2
        if (installed_version <= 1) {
            this.update_database_version(2);

            // downloadpath_video
            var videoDir = path.join(os.homedir(), "Videos");
            this.create_setting("downloadpath_video", videoDir);

            // downloadpath_audioonly
            var musicDir = path.join(os.homedir(), "Music");
            this.create_setting("downloadpath_audioonly", musicDir);

            // enable_autodownload
            this.create_setting("enable_autodownload", "false")
        }
        // install v3
        if (installed_version <= 2) {
            //this.update_database_version(3);

        }
    }

    update_database_version(version) {
        this.db.prepare("UPDATE settings SET setting_value = ? WHERE setting_name = ?").run(version, "db_version");
    }

    create_setting(name, value) {
        this.db.prepare("INSERT INTO settings (setting_name, setting_value) VALUES (?, ?)")
            .run(name, value);
    }

}