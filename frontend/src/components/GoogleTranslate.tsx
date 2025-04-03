"use client";
import { useEffect } from "react";

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: {
            translate: {
                TranslateElement: {
                    new (
                        options: object,
                        containerId: string
                    ): void;
                    InlineLayout: {
                        SIMPLE: string;
                    };
                };
            };
        };
    }
}

export default function GoogleTranslate() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,es,fr,de,zh-CN,ja,ru,ar,pt,hi,it,ko,nl,tr,sv,pl,da,fi,no,el,he,cs,hu,th,vi,id,ms,uk,ro,bg,hr,sk,sl,lt,lv,et,fa,ta,te,kn,ml", // 40 popular languages
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                "google_translate_element"
            );
        };
    }, []);

    return <div id="google_translate_element"></div>;
}