import { Database } from './database'
import { Settings } from './settings';
const youtubedl = require('youtube-dl-exec');
const path = require("path");

export class Downloader {
    client = new Database();

    static downloadType = {
        VIDEO: 0,
        AUDIO_ONLY: 1
    }

    addDownloadRequest(url, asDownloadType) {
        // Get video data
        youtubedl(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,

        }).then(vData => {
            console.log(vData);
            // Download Thumbnail
            var thumbUrl = vData.thumbnails[0].url;

            // Determine output path
            var savePath = "";
            var format = "";
            if (asDownloadType == Downloader.downloadType.VIDEO) {
                savePath = path.join(Settings.get("downloadpath_video"), vData.title + ".mp4");
                format = "MP4";
            }
            else if (asDownloadType == Downloader.downloadType.AUDIO_ONLY) {
                savePath = path.join(Settings.get("downloadpath_audioonly"), vData.title + ".mp3");
                format = "MP3";
            }
            else console.error("downloader.addDownloadRequest failed due to invalid asDownloadType: " + asDownloadType)


            // Add request to database
            this.client.open();
            this.client.db.prepare(
                "INSERT INTO download_history (source_url, save_path, title, duration_seconds, file_format) VALUES (?, ?, ?, ?, ?);")
                .run(url, savePath, vData.title, vData.duration, format);
            this.client.close();

            // Display in HistoryBox
        });

    }

    getOutputDir(format) {
        //todo: make a setting for this, make if not exist
        return "C:\\temptest\\";
    }
}