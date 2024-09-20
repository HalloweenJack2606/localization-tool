import React, { useEffect, useState } from "react";
import {eventBus} from "../../../ajonjolib/toasts/toast/toast";
import Modal from "../../../ajonjolib/modal/modal/modal";
import {Label, Text, Button} from "../../../ajonjolib/inputs/ajonjolinput";
import LanguageSelect from "../../../ajonjolib/inputs/language_select";
import {defaultColumns} from "../../../../utils/table_utils";

export default function CreateProjectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        columns: defaultColumns
    });

    useEffect(() => {
        eventBus.subscribe('project_create_open', (rec_data) => {
            setIsOpen(true);
        });
        eventBus.subscribe('project_create_close', (data) => {setIsOpen(false)});
    }, []);

    const createProject = () => {
        localStorage.setItem("project", JSON.stringify(form));

        window.location.reload();
    }

    return (
        <div>
            {isOpen &&
                <Modal title="Create Project" close={() => setIsOpen(false)}>
                    <Label>Name</Label>
                    <Text value={form['name']} onChange={value => setForm({...form, name: value})}/>

                    <Label className={'mt-4'}>Source Language</Label>
                    <LanguageSelect searchable={true} value={form['source_language']} onChange={value => setForm({...form, source_language: value[0]})}/>

                    <div className={'d-flex justify-content-end align-items-center mt-4'}>
                        <Button variant={'primary'} name={'Create Project'} onSubmit={() => createProject()}/>
                    </div>
                </Modal>
            }
        </div>
    )
}