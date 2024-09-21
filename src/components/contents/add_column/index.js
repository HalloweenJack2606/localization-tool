import React, {useContext, useEffect, useState} from 'react';
import Modal from "../../ajonjolib/modal/modal/modal";
import {Button, Label, Select} from "../../ajonjolib/inputs/ajonjolinput";
import {eventBus} from "../../ajonjolib/toasts/toast/toast";
import {columnOptions} from "../../../utils/table_utils";
import ProjectContext from "../../../context/project";
import LanguageSelect from "../../ajonjolib/inputs/language_select";
import languages from '../../ajonjolib//inputs/language_select/data/lang-flags.json';

export default function AddColumnModal() {
    const project = useContext(ProjectContext);
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() => {
        eventBus.subscribe('add_column_open', (rec_data) => {
            setIsOpen(true);
        });
        if(!project) return;
        // we check by internal, not by value because target language can be repeated
        const filteredOptions = columnOptions.filter((option) => !project.columns.some(col => col.internal === option.internal));
        setOptions(filteredOptions);
    }, [project]);

    const addColumn = () => {
        const projectCopy = {...project};
        let newColumn = {};
        let availableLanguages = [...project.languages];
        if(form?.column === 5) {
            const foundLang = languages[form?.lang];
            newColumn = {
                name: foundLang?.nameEnglish,
                internal: `dst_${form?.lang}`,
                flag_icon: form?.lang,
                type: "textarea",
                value: 5
            };
            availableLanguages = [...project.languages, form?.lang];
            console.log(newColumn);
        } else {
            newColumn = options.find(x => x.value === form?.column);
        }

        projectCopy.languages = availableLanguages;
        projectCopy.columns = [...projectCopy.columns, newColumn];
        localStorage.setItem('project', JSON.stringify(projectCopy));

        window.location.reload();
    }

    return (
        <div>
            {isOpen &&
                <Modal title="Add Column" close={() => setIsOpen(false)}>
                    <div>
                        <Label>Column</Label>
                        <Select value={form?.column} options={options} onChange={(val) => {
                            setForm({...form, column: val[0]});
                        }}/>
                    </div>

                    {form?.column === 5 &&
                        <div className={'mt-4'}>
                            <Label>Target Language</Label>
                            <LanguageSelect searchable={true} value={form['lang']} onChange={value => setForm({...form, lang: value[0]})}/>
                        </div>
                    }

                    <div className={'d-flex justify-content-end align-items-center mt-4'}>
                        <Button variant={'primary'} name={'Add Column'} onSubmit={() => addColumn()}/>
                    </div>
                </Modal>
            }
        </div>
    )
}