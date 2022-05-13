<template>
    {{ json_str }}
</template>

<script setup>

import { ref, toRef } from "vue";
const json_str = ref([]);
const orgs = ref({});


const fetchOrgs = async () => {
    let found = true;
    let id = 1;
    let json_list = [];
    while (found) {
        const response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=po&og=" + id
        );
        const json = await response.json();
        if (json[0].head.name) {
            json_str.value.push({
                id: id,
                name: json[0].head.name,
                sname: json[0].head.sname,
            });
            if (Object.keys(json[0].menu.org.list).length) {
                json_list.push(json[0].menu.org.list);
            }
            id++;
            continue;
        }
        json_list.forEach(item => {
            console.log(item[Object.keys(item)[0]]);
            let v_id = Object.keys(item)[0];
            console.log(v_id);
            console.log(Object.keys(item));
            for (let asoc of Object.keys(item)) {
                console.log("Asoc: " + asoc + " - " + item[asoc]);
                if (isAssoc(asoc)) {
                    console.log("IS ASSOC: " + asoc);
                    v_id = asoc;
                }
            };
            item.v_id = v_id;
        });

        json_list.forEach(element => {
            for (let element2 in element) {
                console.log(element2);
                for (let i = 0; i < json_str.value.length; i++) {
                    if (json_str.value[i].id == element2) {
                        json_str.value[i].v_id = element.v_id;
                    }
                }
            }
        });

        console.log("finished");
        console.log(json_str.value);
        console.log(JSON.stringify(json_list));
        found = false;

    }
};

const isAssoc = (id) => {
    console.log("isAssoc: " + id);
    const assocs = orgs.value["Landesverbände"];
    for (let asoc in assocs) {
        console.log(assocs[asoc].og);
        if (String(assocs[asoc].og) == String(id)) {
            console.log(assocs[asoc].og + " == " + id);
            console.log("true");
            return true;
        }
    }
    return false;
}

const fetchOrganizations = async () => {
    const response = await fetch("/organizations.json");
    const json = await response.json();
    orgs.value = json;
}


const main = async () => {
    await fetchOrganizations();
    await fetchOrgs();
}

main();
</script>