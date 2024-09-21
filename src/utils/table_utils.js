const defaultColumns = [
    { name: "#", internal: "id", type: "number", value: 0 },
    { name: "Record ID", internal: "record_id", type: "text", value: 1 },
    { name: "Source", internal: "lang_src", type: "textarea", value: 2 },
    { name: "Character Limit", internal: "char_limit", type: "number", value: 3 },
    { name: "Path", internal: "path", type: "text", value: 4 }
];

const columnOptions = [
    { name: "Character Limit", internal: "char_limit", type: 'number', value: 3 },
    { name: "Path", internal: "path", type: "text", value: 4 },
    { name: "Target Language", internal: "dst", type: "textarea", value: 5 }
];

const defaultRow = {
    record_id: { data: "", last_modified: Date.now() },
    lang_src: { data: "", last_modified: Date.now() },
    char_limit: { data: "", last_modified: Date.now() },
    path: { data: "", last_modified: Date.now() }
};

export {
    defaultColumns,
    defaultRow,
    columnOptions
}