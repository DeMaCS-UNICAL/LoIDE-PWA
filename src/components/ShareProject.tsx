import {
    IonButton,
    IonCol,
    IonInput,
    IonItem,
    IonList,
    IonRow,
    IonSpinner,
    IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { APIURLShortening, LoidePath, Toast, URLInput } from "../lib/constants";
import Utils from "../lib/utils";

interface ShareProjectProps {
    onCopyLink?: (done: boolean) => void;
}

const ShareProject: React.FC<ShareProjectProps> = (props) => {
    const [
        clipboardWriteSupported,
        setClipboardWriteSupported,
    ] = useState<boolean>(false);

    useEffect(() => {
        let supp = Utils.isClipboardWriteSupported();
        setClipboardWriteSupported(supp);
    }, []);

    const [url, setUrl] = useState<string>(URLInput.Loading);

    const [urlLoading, setUrlLoading] = useState<boolean>(true);

    useEffect(() => {
        const loideProjectData = Utils.getLoideProjectData();

        if (Object.keys(loideProjectData).length > 0) {
            let URL = window.location.host;

            let params = encodeURIComponent(JSON.stringify(loideProjectData));
            URL += `/${LoidePath.Editor}/` + params;

            fetch(APIURLShortening + encodeURIComponent(URL), {
                mode: "cors",
                method: "POST",
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setUrlLoading(false);
                        if (result.shorturl === undefined) {
                            if (URL.length >= 5000) {
                                setUrl(URLInput.Error);
                                Utils.generateGeneralToast(
                                    `${Toast.ErrorLinkGeneration.message.TheProjectIsTooLong}`,
                                    `${Toast.ErrorLinkGeneration.header}`,
                                    "danger"
                                );
                            }
                            setUrl(URL);
                        } else setUrl(result.shorturl);
                    },
                    (error) => {
                        setUrl(URLInput.Error);
                        setUrlLoading(false);
                        if (URL.length >= 5000) {
                            Utils.generateGeneralToast(
                                `${Toast.ErrorLinkGeneration.message.TheProjectIsTooLong}`,
                                `${Toast.ErrorLinkGeneration.header}`,
                                "danger"
                            );
                        } else {
                            Utils.generateGeneralToast(
                                `${Toast.ErrorLinkGeneration.message.TryItLater}`,
                                `${Toast.ErrorLinkGeneration.header}`,
                                "danger"
                            );
                        }
                    }
                );
        }
    }, []);

    const selectAll = (e: any) => {
        e.target.select();
    };

    const copyLink = () => {
        Utils.copyTextToClipboard(
            url,
            () => {
                Utils.generateGeneralToast(
                    Toast.LinkCopiedSuccessfully.message,
                    Toast.LinkCopiedSuccessfully.header,
                    "success"
                );

                if (props.onCopyLink) props.onCopyLink(true);
            },
            () => {
                Utils.generateGeneralToast(
                    Toast.CannotCopyTheLink.message,
                    Toast.CannotCopyTheLink.header,
                    "danger"
                );
                if (props.onCopyLink) props.onCopyLink(false);
            }
        );
    };

    return (
        <>
            <IonRow>
                <IonCol sizeMd="10" offsetMd="1" sizeLg="8" offsetLg="2">
                    <IonList>
                        <IonItem>
                            <IonInput
                                data-testid="url-input"
                                inputmode="url"
                                value={url}
                                readonly={true}
                                onFocus={selectAll}
                            />
                            {urlLoading && (
                                <IonSpinner
                                    slot="end"
                                    color="primary"
                                    name="dots"
                                />
                            )}
                        </IonItem>
                    </IonList>
                    {clipboardWriteSupported && (
                        <IonButton
                            expand="block"
                            className="ion-margin-top"
                            title="Copy link"
                            onClick={copyLink}
                        >
                            Copy link
                        </IonButton>
                    )}

                    {!clipboardWriteSupported && (
                        <div className="ion-padding-top">
                            <p className="ion-text-center"></p>
                            <IonText color="dark" className="ion-text-center">
                                <h5>Copy the link and share it</h5>
                            </IonText>
                        </div>
                    )}
                </IonCol>
            </IonRow>
        </>
    );
};

export default ShareProject;
