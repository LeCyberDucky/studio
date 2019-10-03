import { observable } from "mobx";

import { validators } from "eez-studio-shared/validation";
import {
    ClassInfo,
    registerClass,
    EezObject,
    PropertyType,
    asArray
} from "project-editor/core/object";
import { Message, Type } from "project-editor/core/output";

import { ProjectStore } from "project-editor/core/store";
import { registerFeatureImplementation } from "project-editor/core/extensions";

import { showGenericDialog } from "eez-studio-ui/generic-dialog";

import { ListNavigationWithProperties } from "project-editor/components/ListNavigation";

import { build } from "project-editor/features/action/build";
import { metrics } from "project-editor/features/action/metrics";

////////////////////////////////////////////////////////////////////////////////

export class Action extends EezObject {
    @observable
    name: string;
    @observable
    description?: string;
    @observable
    implementation?: string;
    @observable
    usedIn: string[] | undefined;

    static classInfo: ClassInfo = {
        properties: [
            {
                name: "name",
                type: PropertyType.String,
                unique: true
            },
            {
                name: "description",
                type: PropertyType.MultilineText
            },
            {
                name: "implementation",
                type: PropertyType.String,
                hideInPropertyGrid: true
            },
            {
                name: "usedIn",
                type: PropertyType.ConfigurationReference
            }
        ],
        newItem: (parent: EezObject) => {
            return showGenericDialog({
                dialogDefinition: {
                    title: "New Action",
                    fields: [
                        {
                            name: "name",
                            type: "string",
                            validators: [
                                validators.required,
                                validators.unique({}, asArray(parent))
                            ]
                        }
                    ]
                },
                values: {}
            }).then(result => {
                return Promise.resolve({
                    name: result.values.name
                });
            });
        },
        navigationComponent: ListNavigationWithProperties,
        navigationComponentId: "actions",
        icon: "code"
    };
}

registerClass(Action);

////////////////////////////////////////////////////////////////////////////////

registerFeatureImplementation("action", {
    projectFeature: {
        mandatory: false,
        key: "actions",
        type: PropertyType.Array,
        typeClass: Action,
        create: () => [],
        check: (object: EezObject) => {
            let messages: Message[] = [];

            if (asArray(object).length >= 65535) {
                messages.push(new Message(Type.ERROR, "Max. 65535 actions are supported", object));
            }

            return messages;
        },
        build: build,
        metrics: metrics
    }
});

////////////////////////////////////////////////////////////////////////////////

export function findAction(actionName: string) {
    return ProjectStore.project.actionsMap.get(actionName);
}