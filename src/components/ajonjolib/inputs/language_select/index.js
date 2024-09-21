import React, {useEffect, useRef, useState} from 'react';
import './data/lang-flags.css';
import languages from './data/lang-flags.json';
import styles from "../select/select.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faCheck} from "@fortawesome/free-solid-svg-icons";

export default function LanguageSelect({ searchable, value, onChange, placeholder, className, style, disabled, multi, showQuantity }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const [selectedOptionValues, setSelectedOptionValues] = useState([]);
    const [selectedOptionNames, setSelectedOptionNames] = useState([]);
    const selectedTextRef = useRef(null);
    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => {
        const parsedLanguageOptions = Object.keys(languages).map((key) => {
            return {
                name: languages[key].nameEnglish,
                value: key,
                flag: `lang-icon-${key}`
            };
        })

        setLanguageOptions(parsedLanguageOptions);

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            // Check if the clicked element is an SVG or its parent is an SVG
            const isSVGClicked = event.target.tagName === 'svg' || event.target.closest('svg');

            if (!isSVGClicked) {
                if (selectedTextRef.current) {
                    selectedTextRef.current.blur();
                }
                setIsOpen(false);
            }
        }
    };

    const toggleOption = (optionValue, optionName) => {
        setSearchTerm('');

        if (multi) {
            const index = selectedOptionValues.indexOf(optionValue);
            if (index === -1) {
                const newValues = [...selectedOptionValues, optionValue];
                setSelectedOptionValues(newValues);
                setSelectedOptionNames([...selectedOptionNames, optionName]);
                if (onChange) onChange(newValues);
            } else {
                const newValues = selectedOptionValues?.filter(obtainedValue => obtainedValue !== optionValue);
                setSelectedOptionValues(newValues);
                setSelectedOptionNames(selectedOptionNames?.filter(name => name !== optionName));
                if (onChange) onChange(newValues);
            }
        } else {
            setSelectedOptionValues([optionValue]);
            setSelectedOptionNames([optionName]);
            setIsOpen(false);
            if (onChange) onChange([optionValue]);
        }
    }

    useEffect(() => {
        if (disabled === true) {
            setIsOpen(false);
        }
    }, [disabled]);

    useEffect(() => {
        if (!multi && value !== undefined) {
            const selectedOption = languageOptions?.find(option => (option.value === value[0] || option.value === value));
            if (selectedOption) {
                setSelectedOptionValues([selectedOption.value]);
                setSelectedOptionNames([selectedOption.name]);
            }
        } else {
            const selectedOptions = languageOptions?.filter(option => value?.includes(option.value));
            if (selectedOptions?.length > 0) {
                setSelectedOptionValues(selectedOptions.map(option => option.value));
                setSelectedOptionNames(selectedOptions.map(option => option.name));
            }
        }
    }, [value, multi]);

    const filteredOptions = languageOptions?.filter(option =>
        option.name.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setSearchTerm("");
    }, [selectedOptionNames]);

    const currentSelection = () => {
        const found = languageOptions?.filter(option => selectedOptionNames.includes(option.name));
        return (
            <div className={'d-flex align-items-center'}>{
                found?.map((option, index) => {
                    return (
                        <div className={'d-flex align-items-center'} key={index}>
                            <div className={`lang-icon ${option.flag} me-1`}/>
                            <div>{option.name}</div>
                            {index < found.length - 1 && (<div className={'me-2'}>,</div>)}
                        </div>
                    )
                })
            }</div>
        );
    }

    return (
        <div className={`${styles.container} ${className}`} ref={dropdownRef} style={style}>
            <div
                className={styles.dropdownButton}
                onClick={() => setIsOpen(prev => (!disabled ? !prev : false))}
            >
                <div style={{ display: 'flex', width: '100%' }}>
                    <div>
                        {(selectedOptionNames.length > 0 ? currentSelection() : (!searchable && 'Select a Language'))}
                    </div>
                    {searchable && (
                        <input
                            placeholder={selectedOptionNames?.length < 1 && 'Search...'}
                            value={searchTerm}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            onInput={e => {
                                setSearchTerm(e.target.value);
                                setIsOpen(true);
                            }}
                            className={styles.searchInput}
                        />
                    )}
                </div>
                <div>
                    {isOpen ? <FontAwesomeIcon icon={faCaretUp} color={'#6D5EBD'} size={'sm'}/> : <FontAwesomeIcon icon={faCaretDown} color={'#6D5EBD'} size={'sm'}/>}
                </div>
            </div>

            <div className={`${styles.dropdownOptions} ${isOpen ? styles.show : ''}`}>
                {filteredOptions?.map((option, index) => (
                    <div
                        key={index}
                        className={`${styles.option} ${
                            selectedOptionValues.includes(option.value) ? styles.selected : ''
                        }`}
                        onClick={() => toggleOption(option.value, option.name)}
                    >
                        <React.Fragment>
                        {multi && (
                            <div className={`${styles.checkbox} ${
                                selectedOptionValues.includes(option.value) ? styles.selected : ''
                            }`}>
                                {selectedOptionValues.includes(option.value) && (
                                    <FontAwesomeIcon icon={faCheck} color={'#FFF'} />
                                )}
                            </div>
                        )}
                            <div className={`lang-icon ${option.flag}`}/>
                        {option.name}
                        </React.Fragment>
                    </div>
                ))}
            </div>
        </div>
    );
};