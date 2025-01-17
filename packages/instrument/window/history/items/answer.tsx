import React from "react";
import { observable, action, makeObservable } from "mobx";
import { observer } from "mobx-react";

import { formatDateTimeLong } from "eez-studio-shared/util";

import type { IAppStore } from "instrument/window/history/history";
import { HistoryItem } from "instrument/window/history/item";
import { PreventDraggable } from "instrument/window/history/helper";

////////////////////////////////////////////////////////////////////////////////

export const AnswerHistoryItemComponent = observer(
    class AnswerHistoryItemComponent extends React.Component<
        {
            appStore: IAppStore;
            historyItem: HistoryItem;
        },
        {}
    > {
        showAll: boolean = false;

        constructor(props: { appStore: IAppStore; historyItem: HistoryItem }) {
            super(props);

            makeObservable(this, {
                showAll: observable
            });
        }

        render() {
            let message = this.props.historyItem.message.trim();

            let textClassName;
            if (message.indexOf("**ERROR") != -1) {
                textClassName = "text-danger";
            }

            if (message.trim().startsWith(`"`)) {
                message = message.replace(/\,\"/g, ',\n"');
            }

            let content;
            if (message.length > 1024 && !this.showAll) {
                content = (
                    <PreventDraggable tag="div">
                        <pre className={textClassName}>
                            {message.slice(0, 1024)}
                        </pre>
                        <div style={{ margin: "5px 0" }}>
                            <button
                                className="btn btn-sm"
                                onClick={action(() => (this.showAll = true))}
                            >
                                Show all
                            </button>
                        </div>
                    </PreventDraggable>
                );
            } else {
                content = (
                    <PreventDraggable tag="pre" className={textClassName}>
                        {message}
                    </PreventDraggable>
                );
            }

            return (
                <div className="EezStudio_AnswerHistoryItem">
                    <p>
                        <small className="EezStudio_HistoryItemDate">
                            {formatDateTimeLong(this.props.historyItem.date)}
                        </small>
                    </p>
                    {this.props.historyItem.getSourceDescriptionElement(
                        this.props.appStore
                    )}
                    {content}
                </div>
            );
        }
    }
);

export class AnswerHistoryItem extends HistoryItem {
    getListItemElement(appStore: IAppStore): React.ReactNode {
        return (
            <AnswerHistoryItemComponent
                appStore={appStore}
                historyItem={this}
            />
        );
    }
}
