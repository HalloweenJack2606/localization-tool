const defaultColumns = [
    { name: "#", internal: "id", enabled: true, type: "number" },
    { name: "String ID", internal: "string_id", enabled: true, type: "text" },
    { name: "Source", internal: "lang_src", enabled: true, type: "text" },
    { name: "Character Limit", internal: "char_limit", enabled: true, type: "number" },
    { name: "Path", internal: "path", enabled: true, type: "text" }
];

const defaultRow = {
    string_id: { data: "", last_modified: Date.now() },
    lang_src: { data: "", last_modified: Date.now() },
    char_limit: { data: "", last_modified: Date.now() },
    path: { data: "", last_modified: Date.now() }
};

export {
    defaultColumns,
    defaultRow
}