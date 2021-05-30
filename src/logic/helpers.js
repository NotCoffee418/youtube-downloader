const fs = require("fs");

export class Helpers {

    // Return working dir with trailing slash
    // dirPath: optinal path inside of working dir, will be generated if new (accepts / or \)
    // fileName: optional file name
    static get_working_dir(dirPath = "", fileName = "") {
        // Convert dirPath depending on OS
        var winExtraPath = dirPath.replace("/", "\\");
        var unixExtraPath = dirPath.replace("\\", "/");

        // Determine output dir by OS
        var resultDir = process.env.APPDATA + "\\youtube-downloader\\" + winExtraPath + "\\" ||         // Windows
            (process.platform == 'darwin' ?
                process.env.HOME + '/Library/Preferences/youtube-downloader/' + unixExtraPath + "/" :   // Mac
                process.env.HOME + "/.local/share/youtube-downloader/" + unixExtraPath + "/");          // Linux

        // Create directory if not exist
        if (!fs.existsSync(resultDir)) {
            fs.mkdirSync(resultDir);
        }

        // return result
        return resultDir + fileName;
    }


}