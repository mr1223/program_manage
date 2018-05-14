


import Vue from 'vue';
import vuex from 'vuex';
import {local,cookie,session} from 'common/public';
import {WXTOKEN,TOKEN,ISCOLLAPSE} from 'common/consts';

Vue.use(vuex);



export default new vuex.Store({
    state:{
        'WXTOKEN': '',//判断微信用户
        'TOKEN': local.get(TOKEN),
        'ISCOLLAPSE': false,//导航的展示/收起
    },
    mutations: {
    	INCREMENT (state,payload){
	    	for (var value in payload) {
				var key_val = value;
				var value = payload[value];
			}
	    	state[key_val] = value;
	    },
	},
	actions: {
		increment (context,keys){
			context.commit('INCREMENT',keys);
		},
		setToken (context,keys){
			local.set(TOKEN,keys);
			context.commit('INCREMENT',{
			    TOKEN: keys
			});
		},
		setISCOLLAPSE (context,keys){
			context.commit('INCREMENT',{
			    ISCOLLAPSE: keys
			});
		}
	}
})