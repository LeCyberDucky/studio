import { makeObservable, observable, action } from "mobx";
import * as FlexLayout from "flexlayout-react";

import {
    AbstractLayoutModels,
    ILayoutModel
} from "eez-studio-ui/layout-models";

export class LayoutModels extends AbstractLayoutModels {
    static PROJECTS_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 15,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Projects",
                component: "Projects"
            }
        ]
    };

    static INSTRUMENTS_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Instruments",
                component: "Instruments"
            }
        ]
    };

    static NEW_PROJECT_WIZARD_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Wizard",
                component: "Wizard"
            }
        ]
    };

    static NEW_PROJECT_WIZARD_FOLDERS_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 15,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "FoldersTree",
                component: "FoldersTree"
            }
        ]
    };

    static NEW_PROJECT_WIZARD_PROJECT_TYPES_TABSET: FlexLayout.IJsonTabSetNode =
        {
            type: "tabset",
            enableTabStrip: false,
            enableDrag: false,
            enableDrop: false,
            enableClose: false,
            weight: 55,
            children: [
                {
                    type: "tab",
                    enableClose: false,
                    name: "ProjectTypesList",
                    component: "ProjectTypesList"
                }
            ]
        };

    static NEW_PROJECT_WIZARD_PROJECT_PROPERTIES_TABSET: FlexLayout.IJsonTabSetNode =
        {
            type: "tabset",
            enableTabStrip: false,
            enableDrag: false,
            enableDrop: false,
            enableClose: false,
            weight: 30,
            children: [
                {
                    type: "tab",
                    enableClose: false,
                    name: "ProjectProperties",
                    component: "ProjectProperties"
                }
            ]
        };

    static INSTRUMENTS_BODY_WORKBENCH: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Workbench",
                component: "Workbench"
            }
        ]
    };

    static INSTRUMENTS_BODY_SELECTED_INSTRUMENT: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "SelectedInstrument",
                component: "SelectedInstrument"
            }
        ]
    };

    static INSTRUMENT_TOOLBAR_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        weight: 10,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Actions",
                component: "Toolbar"
            }
        ]
    };

    static INSTRUMENT_PROPERTIES_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        weight: 25,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Properties",
                component: "Properties"
            }
        ]
    };

    static INSTRUMENT_CONNECTION_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        weight: 25,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Connection",
                component: "Connection"
            }
        ]
    };

    static INSTRUMENT_HISTORY_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        weight: 40,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "History",
                component: "History"
            }
        ]
    };

    static EXTENSION_MANAGER_MASTER_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Master",
                component: "Master"
            }
        ]
    };

    static EXTENSION_MANAGER_DETAILS_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 55,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Details",
                component: "Details"
            }
        ]
    };

    static DOCUMENTATION_BROWSER_TOC_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 33,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "TOC",
                component: "TOC"
            }
        ]
    };

    static DOCUMENTATION_BROWSER_CONTENT_TABSET: FlexLayout.IJsonTabSetNode = {
        type: "tabset",
        enableTabStrip: false,
        enableDrag: false,
        enableDrop: false,
        enableClose: false,
        weight: 67,
        children: [
            {
                type: "tab",
                enableClose: false,
                name: "Content",
                component: "Content"
            }
        ]
    };

    constructor() {
        super();

        makeObservable(this, {
            projectsAndInstruments: observable,
            projects: observable,
            newProjectWizard: observable,
            newProjectWizardDialog: observable,
            instruments: observable,
            instrumentsBody: observable,
            instrumentProperties: observable,
            extensionManager: observable
        });

        const savedLayoutModels =
            window.localStorage.getItem("homeLayoutModels");
        this.load(
            savedLayoutModels ? JSON.parse(savedLayoutModels) : undefined
        );
    }

    save() {
        const savedLayoutModels = super.save();
        window.localStorage.setItem(
            "homeLayoutModels",
            JSON.stringify(savedLayoutModels)
        );
    }

    projectsAndInstruments: FlexLayout.Model;
    projects: FlexLayout.Model;
    newProjectWizard: FlexLayout.Model;
    newProjectWizardDialog: FlexLayout.Model;
    instruments: FlexLayout.Model;
    instrumentsBody: FlexLayout.Model;
    instrumentProperties: FlexLayout.Model;

    extensionManager: FlexLayout.Model;

    documentationBrowser: FlexLayout.Model;

    get models(): ILayoutModel[] {
        const global = {
            borderEnableAutoHide: true,
            splitterSize: 4,
            splitterExtra: 4,
            legacyOverflowMenu: false,
            tabEnableRename: false
        };
        return [
            {
                name: "projectsAndInstruments",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.PROJECTS_TABSET,
                            LayoutModels.INSTRUMENTS_TABSET
                        ]
                    }
                },
                get: () => this.projectsAndInstruments,
                set: action(model => (this.projectsAndInstruments = model))
            },
            {
                name: "projects",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.PROJECTS_TABSET,
                            LayoutModels.NEW_PROJECT_WIZARD_TABSET
                        ]
                    }
                },
                get: () => this.projects,
                set: action(model => (this.projects = model))
            },
            {
                name: "instruments",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [LayoutModels.INSTRUMENTS_TABSET]
                    }
                },
                get: () => this.instruments,
                set: action(model => (this.instruments = model))
            },
            {
                name: "instrumentsBody",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.INSTRUMENTS_BODY_WORKBENCH,
                            LayoutModels.INSTRUMENTS_BODY_SELECTED_INSTRUMENT
                        ]
                    }
                },
                get: () => this.instrumentsBody,
                set: action(model => (this.instrumentsBody = model))
            },
            {
                name: "instrumentProperties",
                version: 15,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            {
                                type: "row",
                                children: [
                                    LayoutModels.INSTRUMENT_TOOLBAR_TABSET,
                                    LayoutModels.INSTRUMENT_PROPERTIES_TABSET,
                                    LayoutModels.INSTRUMENT_CONNECTION_TABSET,
                                    LayoutModels.INSTRUMENT_HISTORY_TABSET
                                ]
                            }
                        ]
                    }
                },
                get: () => this.instrumentProperties,
                set: action(model => (this.instrumentProperties = model))
            },
            {
                name: "newProjectWizard",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.NEW_PROJECT_WIZARD_FOLDERS_TABSET,
                            LayoutModels.NEW_PROJECT_WIZARD_PROJECT_TYPES_TABSET,
                            LayoutModels.NEW_PROJECT_WIZARD_PROJECT_PROPERTIES_TABSET
                        ]
                    }
                },
                get: () => this.newProjectWizard,
                set: action(model => (this.newProjectWizard = model))
            },
            {
                name: "newProjectWizardDialog",
                version: 10,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.NEW_PROJECT_WIZARD_FOLDERS_TABSET,
                            LayoutModels.NEW_PROJECT_WIZARD_PROJECT_TYPES_TABSET,
                            LayoutModels.NEW_PROJECT_WIZARD_PROJECT_PROPERTIES_TABSET
                        ]
                    }
                },
                get: () => this.newProjectWizardDialog,
                set: action(model => (this.newProjectWizardDialog = model))
            },
            {
                name: "extensionManager",
                version: 1,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.EXTENSION_MANAGER_MASTER_TABSET,
                            LayoutModels.EXTENSION_MANAGER_DETAILS_TABSET
                        ]
                    }
                },
                get: () => this.extensionManager,
                set: action(model => (this.extensionManager = model))
            },
            {
                name: "documentationBrowser",
                version: 3,
                json: {
                    global,
                    borders: [],
                    layout: {
                        type: "row",
                        children: [
                            LayoutModels.DOCUMENTATION_BROWSER_TOC_TABSET,
                            LayoutModels.DOCUMENTATION_BROWSER_CONTENT_TABSET
                        ]
                    }
                },
                get: () => this.documentationBrowser,
                set: action(model => (this.documentationBrowser = model))
            }
        ];
    }
}

export const homeLayoutModels = new LayoutModels();
