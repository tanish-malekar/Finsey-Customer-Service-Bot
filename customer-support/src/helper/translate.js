import translate from "translate";

translate.engine = "google"; // Or "yandex", "libre", "deepl"
translate.key = "AIzaSyCn_8HBVuef5zIY09g7Ct8sRyT5CQ4xA9U";

const transalate = async (text, lang) =>{
    return new Promise(async (resolve)=>{
        let transalated = await translate(text, lang);
        resolve(transalated);
    });
}

export default transalate;