/**
 * @name SecretMessage
 * @version 0.0.1
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

    const buttonHTML = 
    `<div class="buttonContainer-28fw2U da-buttonContainer secretMessage-button">
        <button aria-label="Send Secret Message" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
            <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-3D60ES da-icon" viewBox="0 0 24 24" aria-hidden="false" fill="currentColor" width="24px" height="24px">
                <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M 19.207031 5.332031 L 14.21875 0.355469 C 13.992188 0.128906 13.679688 0 13.351562 0 L 13.042969 0 L 13.042969 6.5 L 19.566406 6.5 L 19.566406 6.191406 C 19.566406 5.871094 19.4375 5.558594 19.207031 5.332031 Z M 11.414062 6.90625 L 11.414062 0 L 1.222656 0 C 0.542969 0 0 0.542969 0 1.21875 L 0 24.78125 C 0 25.457031 0.542969 26 1.222656 26 L 18.34375 26 C 19.023438 26 19.566406 25.457031 19.566406 24.78125 L 19.566406 8.125 L 12.636719 8.125 C 11.964844 8.125 11.414062 7.574219 11.414062 6.90625 Z M 3.261719 3.65625 C 3.261719 3.433594 3.445312 3.25 3.667969 3.25 L 7.746094 3.25 C 7.96875 3.25 8.152344 3.433594 8.152344 3.65625 L 8.152344 4.46875 C 8.152344 4.691406 7.96875 4.875 7.746094 4.875 L 3.667969 4.875 C 3.445312 4.875 3.261719 4.691406 3.261719 4.46875 Z M 3.261719 7.71875 L 3.261719 6.90625 C 3.261719 6.683594 3.445312 6.5 3.667969 6.5 L 7.746094 6.5 C 7.96875 6.5 8.152344 6.683594 8.152344 6.90625 L 8.152344 7.71875 C 8.152344 7.941406 7.96875 8.125 7.746094 8.125 L 3.667969 8.125 C 3.445312 8.125 3.261719 7.941406 3.261719 7.71875 Z M 10.597656 21.121094 L 10.597656 22.34375 C 10.597656 22.566406 10.414062 22.75 10.191406 22.75 L 9.375 22.75 C 9.148438 22.75 8.96875 22.566406 8.96875 22.34375 L 8.96875 21.109375 C 8.394531 21.082031 7.832031 20.878906 7.371094 20.53125 C 7.171875 20.382812 7.160156 20.089844 7.339844 19.917969 L 7.941406 19.347656 C 8.078125 19.210938 8.289062 19.207031 8.453125 19.308594 C 8.652344 19.433594 8.875 19.5 9.109375 19.5 L 10.539062 19.5 C 10.871094 19.5 11.140625 19.199219 11.140625 18.832031 C 11.140625 18.527344 10.957031 18.261719 10.695312 18.183594 L 8.402344 17.5 C 7.457031 17.214844 6.792969 16.308594 6.792969 15.292969 C 6.792969 14.050781 7.761719 13.039062 8.96875 13.003906 L 8.96875 11.78125 C 8.96875 11.558594 9.148438 11.375 9.375 11.375 L 10.191406 11.375 C 10.414062 11.375 10.597656 11.558594 10.597656 11.78125 L 10.597656 13.011719 C 11.171875 13.042969 11.730469 13.246094 12.195312 13.59375 C 12.394531 13.742188 12.402344 14.035156 12.222656 14.207031 L 11.625 14.777344 C 11.484375 14.914062 11.277344 14.917969 11.113281 14.816406 C 10.910156 14.691406 10.6875 14.625 10.457031 14.625 L 9.023438 14.625 C 8.691406 14.625 8.425781 14.925781 8.425781 15.292969 C 8.425781 15.597656 8.605469 15.863281 8.871094 15.941406 L 11.164062 16.625 C 12.109375 16.910156 12.773438 17.816406 12.773438 18.832031 C 12.773438 20.074219 11.800781 21.085938 10.597656 21.121094 Z M 10.597656 21.121094 "/>
                </svg>
            </div>
        </button>
    </div>`;

    const {DiscordModules: {React, DiscordConstants, Events}, DiscordModules, DiscordSelectors, PluginUtilities, DOMTools, Logger, WebpackModules} = Api;
    let nodecrypto = require('crypto');

    class Crypto{

        static encrypt(key, content) {
            const iv = nodecrypto.randomBytes(16);
            let sha256 = this.sha256(key);
            let cipher = nodecrypto.createCipheriv(algorithm, sha256, iv);
            let encrypted = cipher.update(content);
            encrypted = Buffer.concat([iv, encrypted, cipher.final()]);
            return { data: encrypted.toString('hex')};
        }
    
        static decrypt(key, content) {
            let input = Buffer.from(content, 'hex');
            let sha256 = this.sha256(key);
            let iv = Buffer.from(input.slice(0, 16));
            let decipher = nodecrypto.createDecipheriv(algorithm, sha256, iv);
            let encryptedText = input.slice(16);
            let decrypted = decipher.update(encryptedText);
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
        static setKey(userId, key) {
            const items = keylist;
            const index = keylist.findIndex(kvp => kvp.value.key === userId);
            if (index > -1) {
                items[index].value = { key: userId, value: key };
                return;
            }
            keylist.push({ key: userId, value: key }); 
        }

        //Generates exchange keys for current user
        static createKeyExchange(userId) {
            if (ECDH_STORAGE.hasOwnProperty(userId)) return null;
            ECDH_STORAGE[userId] = this.createECDH();
            setTimeout(() => {
                //Expire the keys after 30 seconds, if computeSecret is not called in this time window, user has to create new keypair
                if (ECDH_STORAGE.hasOwnProperty(userId)) {
                    delete ECDH_STORAGE[userId];
                }
                Logger.warn("Key exchange expired.");
                BdApi.showToast("Key exchange expired.", {timeout: 5000, type: 'warning'});
            }, 30000);
            return this.generateECDHKeys(ECDH_STORAGE[userId]);
        }

        static handlePublicKey(userId, content, username) {
            const [tagstart, begin, key, end, tagend] = content.split('\n');
            if (begin !== '-----BEGIN PUBLIC KEY-----' || end !== '-----END PUBLIC KEY-----') return; // No key in the message
            try {
                BdApi.showConfirmationModal("Exchange Request", `The user ${username} is requesting key exchange.`, {
                    confirmText: "Exchange",
                    cancelText: "Cancel",
                    onConfirm: () => {

                        //User confirmed the exchange
                        if (!ECDH_STORAGE.hasOwnProperty(userId)) {
                            const publicKeyMessage = `\`\`\`\n-----BEGIN PUBLIC KEY-----\n${this.createKeyExchange(userId)}\n-----END PUBLIC KEY-----\n\`\`\``;
                            BdApi.findModuleByProps("sendMessage").sendMessage(ChannelStore.getChannel(SelectedChannelStore.getChannelId()).id, {content: publicKeyMessage, validNonShortcutEmojis: []});
                        }
                        const secret = this.computeSecret(userId, key);
                        this.setKey(userId, secret);
                        BdApi.showToast("Exchange successful.", {timeout: 5000, type: 'success'});
                        Logger.log("Key for user" + userId + " saved.");
                    }
                });
            } catch (err) {
                Logger.err(err);
                return;
            }
        }
    }

    class PatchEvents{
        
        //If recieved message in current DM channel is a Key exchange, process by handlePublicKey
        static patchMessages = e => {
            try{
                let channelId = SelectedChannelStore.getChannelId();
                if(!channelId) return;
                if(channelId != e.message.channel_id) return;
                if(!(ChannelStore.getChannel(channelId).type == 1)) return;
                if(e.message.author.id == UserStore.getCurrentUser().id) return;
                Crypto.handlePublicKey(e.message.author.id, e.message.content, e.message.author.username);
            }
            catch(err){
                Logger.err(err);
            }
        }
    }

    const SelectedChannelStore = DiscordModules.SelectedChannelStore;
    const ChannelStore = DiscordModules.ChannelStore;
    const UserStore = DiscordModules.UserStore;
    
    const userMentionPattern = new RegExp(`<@!?([0-9]{10,})>`, 'g');
    const roleMentionPattern = new RegExp(`<@&([0-9]{10,})>`, 'g');
    const everyoneMentionPattern = new RegExp(`(?:\\s+|^)@everyone(?:\\s+|$)`);

    const algorithm = 'aes-256-cbc';
    const ECDH_STORAGE = {};
    const keylist = [{key: "", value: ""}]; // Change for proper database
    const patch = message => PatchEvents.patchMessages(message);


    //Plugin Class
    return class SecretMessage extends Plugin {
        onStart() {
            BdApi.findModuleByProps("dispatch", "subscribe").subscribe("MESSAGE_CREATE", patch);
            const form = document.querySelector("form");
            if (form) this.addButton(form);
        }

        onStop() {
            BdApi.findModuleByProps("dispatch", "unsubscribe").unsubscribe("MESSAGE_CREATE", patch);
            const button = document.querySelector(".secretMessage-button");
            if (button) button.remove();
            PluginUtilities.removeStyle(this.getName());
        }

        addButton(form) {
            if (form.querySelector(".secretMessage-button")) return;
            const button = DOMTools.createElement(buttonHTML);
            form.querySelector(ZeresPluginLibrary.DiscordSelectors.Textarea.attachButton).parent().parent().prepend(button);

            //Create your pair of keys by clicking the button
            button.addEventListener("click", () => {
                const channel = ChannelStore.getChannel(SelectedChannelStore.getChannelId());
                if(!channel.type == 1) return;
                const keyExchange = Crypto.createKeyExchange(channel.id);
                const publicKeyMessage = `\`\`\`\n-----BEGIN PUBLIC KEY-----\n${keyExchange}\n-----END PUBLIC KEY-----\n\`\`\``;
                BdApi.findModuleByProps("sendMessage").sendMessage(channel.id, {content: publicKeyMessage, validNonShortcutEmojis: []});
                Logger.log("Key exchange for channel " + channel.id + " started.");
                BdApi.showToast("Key exchange started.", {timeout: 5000, type: 'info'});
            });
        }

        observer(e) {
            if (!e.addedNodes.length || !e.addedNodes[0] || !e.addedNodes[0].querySelector) return;
            const form = e.addedNodes[0].querySelector(DiscordSelectors.Textarea.inner);
            if (form) this.addButton(form);
        }

    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();


/*@end@*/
