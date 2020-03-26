import Vue from 'vue'


export default {
    setItem(state, { item, id, resource }) {
        item['_key'] = id;
        Vue.set(state[resource].items, id, item);
    },
    removeItem(state, { id, resource }) {
        Vue.set(state[resource].items[id], {})
    }
}