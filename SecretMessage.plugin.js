/**
 * @name SecretMessage
 * @version 0.0.3
 * @source https://github.com/Puv1s/SecretMessage/blob/main/SecretMessage.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Puv1s/SecretMessage/master/SecretMessage.plugin.js
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {
        info:{
            name:"SecretMessage",
            authors:[
                {
                    name:"Puwu",
                    discord_id:"116242787980017679",
                    github_username:"Puv1s"
                },
                {
                    name:"Kyza",
                    discord_id:"220584715265114113",
                    github_username:"Kyza"
                }
            ],
            version:"0.0.3",
            description:"Lets you send invisible text with your initial message, encrypted by E2EE.",
            github:"https://github.com/Puv1s/SecretMessage",
            github_raw:"https://raw.githubusercontent.com/Puv1s/SecretMessage/master/SecretMessage.plugin.js"
	},
            changelog:[
                {
                    title:"Fixed",
                    type:"fixed",
                    items:[
                        "Zere zoom",
                        "More performance drain"
                    ]
                }
            ],
            
            main:"index.js"
        };

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {

    const ButtonsHTML = 
    `<div class="buttonContainer-28fw2U da-buttonContainer secretMessage-encrypt-button" tabindex="-1">
            <button aria-label="Send Secret Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-3D60ES da-icon" viewBox="0 0 24 24" aria-hidden="false" fill="currentColor" width="24px" height="24px">
                        <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M 19.246094 3.253906 C 18.121094 2.128906 16.710938 1.546875 15 1.5 C 13.304688 1.546875 11.878906 2.128906 10.753906 3.253906 C 9.628906 4.378906 9.058594 5.789062 9.015625 7.5 C 9.015625 7.949219 9.058594 8.386719 9.148438 8.835938 L 0 18 L 0 19.5 L 1.5 21 L 4.5 21 L 6 19.5 L 6 18 L 7.5 18 L 7.5 16.5 L 9 16.5 L 9 15 L 12 15 L 13.636719 13.335938 C 14.085938 13.453125 14.519531 13.5 15 13.5 C 16.710938 13.453125 18.121094 12.871094 19.246094 11.746094 C 20.371094 10.621094 20.953125 9.210938 21 7.5 C 20.953125 5.789062 20.371094 4.378906 19.246094 3.253906 Z M 16.5 8.070312 C 15.34375 8.070312 14.429688 7.15625 14.429688 6 C 14.429688 4.84375 15.34375 3.929688 16.5 3.929688 C 17.65625 3.929688 18.570312 4.84375 18.570312 6 C 18.570312 7.15625 17.65625 8.070312 16.5 8.070312 Z M 16.5 8.070312 "/>
                    </svg>
                </div>
            </button>
        </div>
    <div class="secretMessage-contextMenu" tabindex="-1">
        <div class="buttonContainer-28fw2U da-buttonContainer secretMessage-exchange-button">
            <button aria-label="Send Secret Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-3D60ES da-icon" viewBox="0 0 19 24" aria-hidden="false" fill="currentColor" width="24px" height="24px">
                        <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M 19.207031 5.332031 L 14.21875 0.355469 C 13.992188 0.128906 13.679688 0 13.351562 0 L 13.042969 0 L 13.042969 6.5 L 19.566406 6.5 L 19.566406 6.191406 C 19.566406 5.871094 19.4375 5.558594 19.207031 5.332031 Z M 11.414062 6.90625 L 11.414062 0 L 1.222656 0 C 0.542969 0 0 0.542969 0 1.21875 L 0 24.78125 C 0 25.457031 0.542969 26 1.222656 26 L 18.34375 26 C 19.023438 26 19.566406 25.457031 19.566406 24.78125 L 19.566406 8.125 L 12.636719 8.125 C 11.964844 8.125 11.414062 7.574219 11.414062 6.90625 Z M 3.261719 3.65625 C 3.261719 3.433594 3.445312 3.25 3.667969 3.25 L 7.746094 3.25 C 7.96875 3.25 8.152344 3.433594 8.152344 3.65625 L 8.152344 4.46875 C 8.152344 4.691406 7.96875 4.875 7.746094 4.875 L 3.667969 4.875 C 3.445312 4.875 3.261719 4.691406 3.261719 4.46875 Z M 3.261719 7.71875 L 3.261719 6.90625 C 3.261719 6.683594 3.445312 6.5 3.667969 6.5 L 7.746094 6.5 C 7.96875 6.5 8.152344 6.683594 8.152344 6.90625 L 8.152344 7.71875 C 8.152344 7.941406 7.96875 8.125 7.746094 8.125 L 3.667969 8.125 C 3.445312 8.125 3.261719 7.941406 3.261719 7.71875 Z M 10.597656 21.121094 L 10.597656 22.34375 C 10.597656 22.566406 10.414062 22.75 10.191406 22.75 L 9.375 22.75 C 9.148438 22.75 8.96875 22.566406 8.96875 22.34375 L 8.96875 21.109375 C 8.394531 21.082031 7.832031 20.878906 7.371094 20.53125 C 7.171875 20.382812 7.160156 20.089844 7.339844 19.917969 L 7.941406 19.347656 C 8.078125 19.210938 8.289062 19.207031 8.453125 19.308594 C 8.652344 19.433594 8.875 19.5 9.109375 19.5 L 10.539062 19.5 C 10.871094 19.5 11.140625 19.199219 11.140625 18.832031 C 11.140625 18.527344 10.957031 18.261719 10.695312 18.183594 L 8.402344 17.5 C 7.457031 17.214844 6.792969 16.308594 6.792969 15.292969 C 6.792969 14.050781 7.761719 13.039062 8.96875 13.003906 L 8.96875 11.78125 C 8.96875 11.558594 9.148438 11.375 9.375 11.375 L 10.191406 11.375 C 10.414062 11.375 10.597656 11.558594 10.597656 11.78125 L 10.597656 13.011719 C 11.171875 13.042969 11.730469 13.246094 12.195312 13.59375 C 12.394531 13.742188 12.402344 14.035156 12.222656 14.207031 L 11.625 14.777344 C 11.484375 14.914062 11.277344 14.917969 11.113281 14.816406 C 10.910156 14.691406 10.6875 14.625 10.457031 14.625 L 9.023438 14.625 C 8.691406 14.625 8.425781 14.925781 8.425781 15.292969 C 8.425781 15.597656 8.605469 15.863281 8.871094 15.941406 L 11.164062 16.625 C 12.109375 16.910156 12.773438 17.816406 12.773438 18.832031 C 12.773438 20.074219 11.800781 21.085938 10.597656 21.121094 Z M 10.597656 21.121094 "/>
                    </svg>
                </div>
            </button>
        </div>
        <div class="buttonContainer-28fw2U da-buttonContainer secretMessage-image-button">
            <button aria-label="Send Secret Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                    <svg aria-hidden="false" width="36" height="36" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="M1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h.94a.76.76 0 0 1 .03-.03l6.077-6.078a1.75 1.75 0 0 1 2.412-.06L14.5 10.31V2.75a.25.25 0 0 0-.25-.25H1.75zm12.5 11H4.81l5.048-5.047a.25.25 0 0 1 .344-.009l4.298 3.889v.917a.25.25 0 0 1-.25.25zm1.75-.25V2.75A1.75 1.75 0 0 0 14.25 1H1.75A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25zM5.5 6a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0zM7 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0z"/>
                    </svg>
                </div>
            </button>
        </div>
        <div class="buttonContainer-28fw2U da-buttonContainer secretMessage-settings-button">
            <button aria-label="Send Secret Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
                    </svg>
                </div>
            </button>
        </div>
    </div>`;

    const PluginCSS = 
    `
    .secretMessage-buttonArea{
        display:flex;
        align-items: center;
        padding-right: 8px;
        padding-left: 5px;
    }
    .secretMessage-contextMenu{
        display:flex;
        align-items: center;
        width: 0px;
        overflow: hidden;
        transition: width 0s;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 0px 5px 5px 0px;
        height: 70%;
    }
    .secretMessage-openMenu{
        width: 100%;
        margin-right: 8px;
        margin-left: 13px;
        transition: width 0.4s ease-in-out;
    }
    .secretMessage-exchange-button:before{
        display:none;
    }
    .secretMessage-openMenu .secretMessage-exchange-button:before{
        display: block !important;
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: 18px;
        border-style: solid;
        border-color: transparent rgba(255, 255, 255, 0.05) transparent transparent;
        top: 8px;
        left: 28px !important;
    }
    .secretMessage-button-enabled path{
        fill: #43b581;
    }
    .secretMessage-encrypt-button{
        z-index: 100;
    }
    `;

    const {DiscordModules: {React, DiscordConstants, Events}, ReactComponents, DiscordModules, DiscordSelectors, PluginUtilities, DOMTools, Logger, WebpackModules, Patcher} = Api;
    const {Buffer} = require("buffer");
    
    const FileUploadModule = BdApi.findModuleByProps("upload", "instantBatchUpload");
    const Dispatcher = BdApi.findModuleByProps("dispatch", "subscribe");
    const SendMessageModule = BdApi.findModuleByProps("sendMessage");
    const MessageComponent = WebpackModules.find(m => m.type?.displayName === "MessageContent");
    const ReactModal = WebpackModules.getByProps("ModalRoot");
    const ReactFlex = WebpackModules.findByDisplayName("Flex");
    const ReactFormItem = WebpackModules.findByDisplayName("FormItem");
    const ReactFormTitle = WebpackModules.findByDisplayName("FormTitle");
    const ReactFormDivider = WebpackModules.findByDisplayName("FormDivider");
    const ReactInput = WebpackModules.findByDisplayName("TextInput");
    const ReactText = WebpackModules.findByDisplayName("Text");

    const SelectedChannelStore = DiscordModules.SelectedChannelStore;
    const ChannelStore = DiscordModules.ChannelStore;
    const UserStore = DiscordModules.UserStore;
    const MessageStore = DiscordModules.MessageStore;

    let EncryptionEnabled = false;
    const zwsCharacters = ["\u034F", "\u180e", "\u200b", "\u200c", "\u200d"];
    let nodecrypto = require('crypto');
    let machineUuid = require("machine-uuid");
    let req = require("request");

    class CompressExtensions{

        static zeroPad(num) {
            return "000".slice(String(num).length) + num;
        }

        static stringToBinary(str, spaceSeparatedOctets) {
            return str.replace(/[\s\S]/g, (str) => {
                str = this.zeroPad(str.charCodeAt().toString(5));
                return str;
            });
        }

        static binaryToString(str) {
            // Removes the spaces from the binary string
            str = str.replace(/\s+/g, "");
            // Pretty (correct) print binary (add a space every 8 characters)
            str = str.match(/.{1,3}/g).join(" ");

            var newBinary = str.split(" ");
            var binaryCode = [];

            for (var i = 0; i < newBinary.length; i++) {
                binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 5)));
            }

            return binaryCode.join("");
        }

        static stringToZWS(string) {
            let finalString = "";
            let binary = this.stringToBinary(string);
            for (let i = 0; i < binary.length; i++) {
                finalString += zwsCharacters[parseInt(binary[i])];
            }
            return finalString;
        }

        static zwsToString(string) {
            let finalString = "";
            for (let i = 0; i < string.length; i++) {
                finalString += zwsCharacters.indexOf(string[i]);
            }
            return this.binaryToString(finalString);
        }
    }

    class Crypto{

        static encrypt(key, content, prefix = '$:') {
            let iv = nodecrypto.randomBytes(16);
            let cipher = nodecrypto.createCipheriv(algorithm, this.sha256(key), iv);
            let encrypted = cipher.update(content);
            encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
            return prefix + encrypted.toString('hex');
        }
    
        static decrypt(key, content, prefix = '$:') {
            let input = content.replace(prefix, '');
            input = Buffer.from(input, 'hex');
            let decipher = nodecrypto.createDecipheriv(algorithm, this.sha256(key), Buffer.from(input.slice(0, 16)));
            let decrypted = decipher.update(input.slice(16));
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
    
        static async createHmac(key, data, algorithm = 'sha256') {
            const hmac = nodecrypto.createHmac(algorithm, key);
            return new Promise((resolve, reject) => {
                hmac.on('readable', () => {
                    const data = hmac.read();
                    if (data) return resolve(data.toString('hex'));
                    reject(null);
                });
                hmac.write(data);
                hmac.end();
            });
        }

        static createECDH(curve = 'secp384r1') {
            return nodecrypto.createECDH(curve);
        }

        static hash(algorithm, data, encoding) {
            const hash = nodecrypto.createHash(algorithm);
            hash.update(data);
            return hash.digest(encoding);
        }

        static randomBytes(length = 16) {
            return nodecrypto.randomBytes(length);
        }

        static sha256(text) {
            const hash = nodecrypto.createHash('sha256');
            hash.update(text);
            return hash.digest();
        }

        static generateECDHKeys(ecdh) {
            return ecdh.generateKeys('base64');
        }

        static getECDHPublicKey(ecdh) {
            return ecdh.getPublicKey('base64');
        }

        static computeECDHSecret(ecdh, otherPublicKey) {
            return ecdh.computeSecret(otherPublicKey, 'base64', 'base64');
        }

        //Generate secret key from your private and another user pubilc key
        static computeSecret(userId, otherKey) {
            try {
                const secret = this.computeECDHSecret(ECDH_STORAGE[userId], otherKey);
                delete ECDH_STORAGE[userId];
                return this.hash('sha256', secret, 'hex');
            } catch (e) {
                throw e;
            }
        }

        //Save the computed secret key used for encryption/decryption
        static setKey(channelId, key) {
            database.keys[channelId] = key;
            machineUuid().then((uuid)=> this.saveDatabase(Crypto.sha256(uuid).toString('hex')));
        }

        static removeKey(channelId){
            delete database.keys[channelId];
        }

        //Generates exchange keys for current user
        static createKeyExchange(channelId) {
            if (ECDH_STORAGE.hasOwnProperty(channelId)) return null;
            ECDH_STORAGE[channelId] = this.createECDH();
            setTimeout(() => {
                //Expire the keys after 30 seconds, if computeSecret is not called in this time window, user has to create new keypair
                if (ECDH_STORAGE.hasOwnProperty(channelId)) {
                    delete ECDH_STORAGE[channelId];
                }
                //Logger.warn("Key exchange expired.");
                //BdApi.showToast("Key exchange expired.", {timeout: 5000, type: 'warning'});
            }, 30000);
            return this.generateECDHKeys(ECDH_STORAGE[channelId]);
        }

        static handlePublicKey(channelId, content, user, isPublic) {
            const [tagstart, begin, key, end, tagend] = content.split('\n');
            if (begin !== '-----BEGIN PUBLIC KEY-----' || end !== '-----END PUBLIC KEY-----') return; // No key in the message
            if(isPublic) {
                this.setKey(channelId, Buffer.from(key, 'base64').toString('hex'));
                BdApi.showToast("Exchange successful.", {timeout: 5000, type: 'success'});
                Logger.log("Key for channel " + channelId + " saved.");
            }
            try {
                BdApi.showConfirmationModal("Exchange Request", `The channel ${user} is requesting key exchange.`, {
                    confirmText: "Exchange",
                    cancelText: "Cancel",
                    onConfirm: () => {

                        //User confirmed the exchange
                        if (!ECDH_STORAGE.hasOwnProperty(channelId)) {
                            const publicKeyMessage = `\`\`\`\n-----BEGIN PUBLIC KEY-----\n${this.createKeyExchange(channelId)}\n-----END PUBLIC KEY-----\n\`\`\``;
                            SendMessageModule.sendMessage(channelId, {content: publicKeyMessage, validNonShortcutEmojis: []});
                        }
                        const secret = this.computeSecret(channelId, key);
                        this.setKey(channelId, secret);
                        BdApi.showToast("Exchange successful.", {timeout: 5000, type: 'success'});
                        Logger.log("Key for channel " + channelId + " saved.");
                    }
                });
            } catch (err) {
                Logger.err(err);
                return;
            }
        }

        static loadDatabase(uuid){
            let db = BdApi.getData(config.info.name, "kvp_db");
            if(db){
               try{
                    database = JSON.parse(Crypto.decrypt(uuid, db, '#DB:'));
               }
               catch (err) { return }
            }
            else{
                database = {
                    keys:{
                    },
                    defaults:{
                        users:{},
                        channels:{}
                    }
                }
            }
        }

        static saveDatabase(uuid){
            BdApi.saveData(config.info.name, "kvp_db", Crypto.encrypt(uuid, JSON.stringify(database), '#DB:'));
        }

    }

    class FileUtils{
        static createFile(text){
            return new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 
                ...new TextEncoder().encode(text)]).buffer], 'SecretMessageFile.png', {type: 'image/png'})
        }

        static extractFromFile(file){
            return Buffer.from(file).slice(73).toString();
        }

        static fileUpload(channelId, message, encmessage){
            let file = this.createFile(encmessage);
            FileUploadModule.upload(channelId, file, null, {content: message}, false, file.name)
        }
    }

    class PatcherFunctions{

        static updateMessage(channelId) {
            const messages = MessageStore.getMessages(channelId);
            if(!messages._array?.length) return;
            for(const message of messages._array) {
              DiscordModules.Dispatcher.dispatch({
                type: "MESSAGE_UPDATE",
                message: message
              });
            }
        }

        //If recieved message in current DM channel is a Key exchange, process by handlePublicKey
        static patchRecievedMessage = e => {
           try{
                if(e.message.author.id == UserStore.getCurrentUser().id) return;
                let channelId = SelectedChannelStore.getChannelId();
                if(!channelId) return;
                if(channelId != e.message.channel_id) return;
                if(database.keys[channelId]) return;
                if(!(ChannelStore.getChannel(channelId).type == 1)) {
                     Crypto.handlePublicKey(channelId, e.message.content, e.message.author.username, true);
                }
                Crypto.handlePublicKey(channelId, e.message.content, e.message.author.username, false);
            }
            catch(err){
                Logger.err(err);
            }
        }

        //Decrypts messages before render
        static patchRenderMessage = e => {
            let prop = e[0];
           try{
                let key = database.keys[prop.message.channel_id];   
                if(!key) return;
                if(prop.message.attachments.length > 0 && prop.message.attachments[0].filename == 'SecretMessageFile.png'){
                    req.get(prop.message.attachments[0].url, async (error, response, body) => {
                        if (error) return;
                        else{
                            let content = FileUtils.extractFromFile(body);
                            let decrypt;
                            try {
                                decrypt = Crypto.decrypt(key, content);

                            } catch (err) { console.log(err); return } // Ignore errors such as non empty

                            if(prop.message.content == ''){
                                e[0].content[0] = '🔐 ' + decrypt;  //doesnt work
                                prop.message.content = '🔐 ' + decrypt;  //works
                            }
                            else{
                                e[0].content[0] = e[0].content[0] + '\n🔐 ' + decrypt; //doesnt work
                                prop.message.content = prop.message.content + '\n🔐 ' + decrypt; //works
                            }
                            prop.message.attachments = [];
                        }
                    });
                }
                if (typeof e[0].content[0] !== 'string') return;
                if (!e[0].content[0].startsWith('$:')) return;
                let decrypt;
                try {
                    decrypt = Crypto.decrypt(key, e[0].content[0]);
                } catch (err) { return } // Ignore errors such as non empty
                e[0].content[0] = decrypt;
            }
            catch(err){
                Logger.err(err);
            }
        }

        static patchSendMessage = e => {
            let channelId = e[0];
            let message = e[1];
            const key = database.keys[channelId];
            let content = message.content;
            if(!EncryptionEnabled || !key) return;
            message.content = Crypto.encrypt(key, content);
        }
    }

    class SlateTextArea {
        static parser = ZLibrary.WebpackModules.find(m => m.deserialize && !m.add);
        static textAreaClassName = ZLibrary.WebpackModules.getByProps("textAreaHeight", "channelTextArea", "highlighted").textArea;
        
        static get instance() {return ZLibrary.ReactTools.getOwnerInstance(document.getElementsByClassName(this.textAreaClassName)[0]);}
    
        static getValue() {
            const textAreaInstance = this.instance;
            if (!textAreaInstance) return "";
            return this.parser.serialize(ZLibrary.Utilities.getNestedProp(textAreaInstance, "editorRef.props.value")) || "";
        }
    
        static setValue(value) {
            const textAreaInstance = this.instance;
    
            if (!this.instance) return false;
    
            try {
                textAreaInstance.setValue(this.parser.deserialize(value));
                return true;
            } catch (error) {
                return false;
            }
        }
    }
    
    const userMentionPattern = new RegExp(`<@!?([0-9]{10,})>`, 'g');
    const roleMentionPattern = new RegExp(`<@&([0-9]{10,})>`, 'g');
    const everyoneMentionPattern = new RegExp(`(?:\\s+|^)@everyone(?:\\s+|$)`);
    const algorithm = 'aes-256-cbc';
    const ECDH_STORAGE = {};
    let database = {};

    const patchRecieve = message => PatcherFunctions.patchRecievedMessage(message);
    const patchRender = (e, t, n, r) => PatcherFunctions.patchRenderMessage(t);
    const patchSend = (e, t, n, r) => PatcherFunctions.patchSendMessage(t);

    let EncryptMessages = false; 

    //Plugin Class
    return class SecretMessage extends Plugin {

        async onStart() {
            console.log(WebpackModules.find(m => m.type?.displayName === "MessageContent"));
            let uuid = await machineUuid();
            await Crypto.loadDatabase(Crypto.sha256(uuid).toString('hex'));
            Patcher.before(MessageComponent, "type", patchRender);
            Patcher.before(SendMessageModule, "sendMessage", patchSend);
            Dispatcher.subscribe("MESSAGE_CREATE", patchRecieve);
            PatcherFunctions.updateMessage(SelectedChannelStore.getChannelId());
            const form = document.querySelector("form");
            const buttonArea = document.querySelector(".secretMessage-buttonArea");
            if (form) {
                if (!buttonArea) this.addButtonArea(form);
            }
            PluginUtilities.addStyle("secretmessage-css", PluginCSS);
        }

        onStop() {
            Dispatcher.unsubscribe("MESSAGE_CREATE", patchRecieve);
            const buttonArea = document.querySelector(".secretMessage-buttonArea");
            if (buttonArea) buttonArea.remove();
            PluginUtilities.removeStyle(this.getName());
        }

        addButtonArea(form) {
            if (form.querySelector(".secretMessage-buttonArea")) return;
            const buttonArea = Object.assign(document.createElement("div"), {
                className: "secretMessage-buttonArea",
                innerHTML: ButtonsHTML
              });
            form.querySelector(ZeresPluginLibrary.DiscordSelectors.Textarea.attachButton).parent().parent().prepend(buttonArea);
            const buttons = form.querySelector(".secretMessage-buttonArea");
            const contextButtons = form.querySelector(".secretMessage-contextMenu");
            const encryptButton = form.querySelector(".secretMessage-encrypt-button");
            const exchangeButton = form.querySelector(".secretMessage-exchange-button");
            const settingsButton = form.querySelector(".secretMessage-settings-button");
            const imageButton = form.querySelector(".secretMessage-image-button");

            if(EncryptionEnabled) encryptButton.addClass("secretMessage-button-enabled");

            settingsButton.addEventListener("click", () => {
                this.openSettingsModal();
            });

            imageButton.addEventListener("click", () => {
                let channelId = SelectedChannelStore.getChannelId();
                const key = database.keys[channelId];
                if(!EncryptionEnabled || !key) return;
                FileUtils.fileUpload(channelId, '', Crypto.encrypt(key, SlateTextArea.getValue()));
                SlateTextArea.setValue('');
            });

            encryptButton.addEventListener("click", (e) => {
                if(!EncryptionEnabled){
                    EncryptionEnabled = true;
                    encryptButton.addClass("secretMessage-button-enabled");
                    BdApi.showToast("Encryption enabled", {timeout: 4000, type: 'warning'});
                }
                else{
                    EncryptionEnabled = false;
                    encryptButton.removeClass("secretMessage-button-enabled");
                    BdApi.showToast("Encryption disabled.", {timeout: 4000, type: 'warning'});
                }
            });

            encryptButton.addEventListener("contextmenu", (e) => {
               if(contextButtons.hasClass("secretMessage-openMenu")) {
                   contextButtons.removeClass("secretMessage-openMenu");
                   contextButtons.blur();
               }
               else {
                   contextButtons.addClass("secretMessage-openMenu");
                   contextButtons.focus();
               }
            });
 
            contextButtons.addEventListener("blur", (e) => {
                setTimeout(() => { if(contextButtons.hasClass("secretMessage-openMenu"))contextButtons.removeClass("secretMessage-openMenu");}, 250);
            });

            //Create your pair of keys by clicking the button
            exchangeButton.addEventListener("click", () => {
                let channelId = SelectedChannelStore.getChannelId();
                if(database.keys[channelId]) {
                    BdApi.showToast("Already exchanged keys for this channel.\nRemove the key from database first.", {timeout: 8000, type: 'error'});
                    return;
                }
                const channel = ChannelStore.getChannel(channelId);
                if(!channel.type == 1){
                    BdApi.showToast("Can't send key into public channel.", {timeout: 4000, type: 'error'});
                    return;
                } 
                const keyExchange = Crypto.createKeyExchange(channel.id);
                const publicKeyMessage = `\`\`\`\n-----BEGIN PUBLIC KEY-----\n${keyExchange}\n-----END PUBLIC KEY-----\n\`\`\``;
                BdApi.findModuleByProps("sendMessage").sendMessage(channel.id, {content: publicKeyMessage, validNonShortcutEmojis: []});
                Logger.log("Key exchange for channel " + channel.id + " started.");
                BdApi.showToast("Key exchange started.", {timeout: 5000, type: 'info'});
            });

        }

        openSettingsModal(){
            let formItems = [];
            for (const [key, value] of Object.entries(database.keys)) {
                formItems.push(
                    React.createElement(ReactFlex, {
                        basis: "auto",
                        grow: 1,
                        shrink: 1,
                        children:[
                            React.createElement(ReactFlex.Child, {
                                basis: "50%",
                                grow: 1,
                                shrink: 1,
                                children:
                                    React.createElement(ReactFormItem, {
                                        className: "flexChild-faoVW3",
                                        children:[
                                            React.createElement(ReactInput, {
                                                disabled: true,
                                                type: "text",
                                                value: key
                                            })
                                        ]
                                    })
                            }),
                            React.createElement(ReactFlex.Child, {
                                basis: "50%",
                                grow: 1,
                                shrink: 1,
                                children:
                                    React.createElement(ReactFormItem, {
                                        children:[
                                            React.createElement(ReactInput, {
                                                disabled: true,
                                                type: "password",
                                                value: value
                                            })
                                        ]
                                    })
                            }),
                        ]
                    }),
                    React.createElement(ReactFormDivider, {
                        className: "marginBottom20-32qID7 marginTop20-3TxNs6"
                    })
                )
            }

            WebpackModules.getByProps("openModal").openModal(props => {
                return React.createElement(ReactModal.ModalRoot, {
                    size: "large",
                    transitionState: props.transitionState,
                    children: [
                        React.createElement(ReactModal.ModalHeader, {
                            className: "header-3ydO_m",
                            separator: false,
                            children: [
                                React.createElement(ReactFlex, {
                                    align: "alignCenter-1dQNNs",
                                    basis: "auto",
                                    className: "header-1TKi98 header-3bB_GQ",
                                    direction: "horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG",
                                    grow: 0,
                                    justify: "justifyStart-2NDFzi",
                                    shrink: 0,
                                    wrap: "noWrap-3jynv6",
                                    children: [
                                        React.createElement(ReactText, {
                                            children: "Key Management",
                                            className: "title-33m_XM",
                                            color: "colorHeaderPrimary-26Jzh-",
                                            size: "size24-RIRrxO"
                                        }),
                                        React.createElement(ReactText, {
                                            children: "Manage your exchanged shared keys.",
                                            className: "subtitle-1DRiTc",
                                            color: "colorHeaderSecondary-3Sp3Ft",
                                            size: "size16-1P40sf"
                                        }),
                                    ]
                                }),
                                React.createElement(ReactModal.ModalCloseButton, {
                                    className: "modalCloseButton-nA1JXv",
                                    onClick: props.onClose
                                }),
                            ]
                        }),
                        React.createElement(ReactModal.ModalContent, {
                            className:"content-1AKki_",
                            children: 
                                React.createElement(ReactFlex, {
                                    basis: "auto",
                                    grow: 1,
                                    shrink: 1,
                                    direction: "vertical-V37hAW flex-1O1GKY directionColumn-35P_nr",
                                    children: [
                                        React.createElement(ReactFlex, {
                                            basis: "auto",
                                            grow: 1,
                                            shrink: 1,
                                            children:[
                                                React.createElement(ReactFlex.Child, {
                                                    basis: "50%",
                                                    grow: 1,
                                                    shrink: 1,
                                                    children:
                                                        React.createElement(ReactFormItem, {
                                                            className: "flexChild-faoVW3",
                                                            children:
                                                                React.createElement(ReactFormTitle, {
                                                                    children: 
                                                                    React.createElement(ReactText, {
                                                                        className: "h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP",
                                                                        tag: "h5",
                                                                        children: ["Channel ID", null, null]
                                                                    })
                                                                })
                                                        })
                                                }),
                                                React.createElement(ReactFlex.Child, {
                                                    basis: "50%",
                                                    grow: 1,
                                                    shrink: 1,
                                                    children:
                                                        React.createElement(ReactFormItem, {
                                                            children:
                                                                React.createElement(ReactFormTitle, {
                                                                    children: React.createElement(ReactText, {
                                                                        className: "h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP",
                                                                        tag: "h5",
                                                                        children: ["Shared Key", null, null]
                                                                    })
                                                                })
                                                        })
                                                }),
                                            ]
                                        }),
                                        formItems
                                    ]
                                })
                        })
                    ]
                });
            })
        }

        observer(e) {
            if (!e.addedNodes.length || !e.addedNodes[0] || !e.addedNodes[0].querySelector) return;
            const form = e.addedNodes[0].querySelector(DiscordSelectors.Textarea.inner);
            const buttonArea = document.querySelector(".secretMessage-buttonArea");
            const encryptButton = document.querySelector(".secretMessage-encrypt-button");
            if (form) {
                if (!buttonArea) this.addButtonArea(form);
                if(encryptButton){
                    if(EncryptionEnabled && database.keys[SelectedChannelStore.getChannelId()]){
                        encryptButton.removeClass("secretMessage-button-enabled");
                    }
                }
            }
        }

    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();


/*@end@*/
