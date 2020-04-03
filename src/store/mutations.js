import Vue from 'vue'


export default {
    setItem(state, { item, id, resource }) {
        try {
            item['_key'] = id;
            Vue.set(state[resource].items, id, item);
        } catch (err) {
            console.log(err);
        }
    },
    removeItem(state, { id, resource }) {
        Vue.set(state[resource].items[id], {})
    }
}