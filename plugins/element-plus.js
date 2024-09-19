import { ElButton, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ElButton);
    nuxtApp.vueApp.use(ElInput);
});
