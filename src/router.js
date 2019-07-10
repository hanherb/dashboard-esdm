import Vue from 'vue';
import Router from 'vue-router';

import OnlineStore from './views/OnlineStore.vue';
import HeaderNavigation from './views/HeaderNavigation.vue';
import IconSidebarNav from './views/IconSidebarNav.vue';
import PersonalBlog from './views/PersonalBlog.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ChangePassword from './views/ChangePassword.vue';
import FileManagerList from './views/FileManagerList.vue';
import FileManagerCards from './views/FileManagerCards.vue';
import TransactionHistory from './views/TransactionHistory.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import ComponentsOverview from './views/ComponentsOverview.vue';
import Tables from './views/Tables.vue';
import BlogPosts from './views/BlogPosts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: '/home',
      meta: { layout: 'non-admin' },
      component: Home,
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('./views/Analytics.vue'),
    },
    {
      path: '/ecommerce',
      name: 'ecommerce',
      component: OnlineStore,
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('./views/UserProfile.vue'),
    },
    {
      path: '/edit-user-profile',
      name: 'edit-user-profile',
      component: () => import('./views/EditUserProfile.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'non-admin' },
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'non-admin' },
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { layout: 'icon-sidebar' },
      component: ForgotPassword,
    },
    {
      path: '/change-password',
      name: 'change-password',
      meta: { layout: 'icon-sidebar' },
      component: ChangePassword,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue'),
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: () => import('./views/AddUser.vue'),
    },
    {
      path: '/update-user',
      name: 'update-user',
      component: () => import('./views/UpdateUser.vue'),
    },
    {
      path: '/delete-user',
      name: 'delete-user',
      component: () => import('./views/DeleteUser.vue'),
    },
    {
      path: '/csv-asumsi-keuangan-op',
      name: 'csv-asumsi-keuangan-op',
      component: () => import('./views/CsvAsumsiKeuanganOP.vue'),
    },
    {
      path: '/csv-neraca-op',
      name: 'csv-neraca-op',
      component: () => import('./views/CsvNeracaOP.vue'),
    },
    {
      path: '/csv-laba-rugi-op',
      name: 'csv-laba-rugi-op',
      component: () => import('./views/CsvLabaRugiOP.vue'),
    },
    {
      path: '/csv-harga-pokok-op',
      name: 'csv-harga-pokok-op',
      component: () => import('./views/CsvHargaPokokOP.vue'),
    },
    {
      path: '/csv-arus-kas-op',
      name: 'csv-arus-kas-op',
      component: () => import('./views/CsvArusKasOP.vue'),
    },
    {
      path: '/csv-investasi-op',
      name: 'csv-investasi-op',
      component: () => import('./views/CsvInvestasiOP.vue'),
    },
    {
      path: '/csv-penerimaan-negara-op',
      name: 'csv-penerimaan-negara-op',
      component: () => import('./views/CsvPenerimaanNegaraOP.vue'),
    },
    {
      path: '/csv-keuangan-lainnya-op',
      name: 'csv-keuangan-lainnya-op',
      component: () => import('./views/CsvKeuanganLainnyaOP.vue'),
    },
    {
      path: '/csv-sumber-pembiayaan-op',
      name: 'csv-sumber-pembiayaan-op',
      component: () => import('./views/CsvSumberPembiayaanOP.vue'),
    },
    {
      path: '/csv-anggaran-belanja-op',
      name: 'csv-anggaran-belanja-op',
      component: () => import('./views/CsvAnggaranBelanjaOP.vue'),
    },
    {
      path: '/csv-asumsi-keuangan-eksplorasi',
      name: 'csv-asumsi-keuangan-eksplorasi',
      component: () => import('./views/CsvAsumsiKeuanganEksplorasi.vue'),
    },
    {
      path: '/csv-neraca-eksplorasi',
      name: 'csv-neraca-eksplorasi',
      component: () => import('./views/CsvNeracaEksplorasi.vue'),
    },
    {
      path: '/csv-laba-rugi-eksplorasi',
      name: 'csv-laba-rugi-eksplorasi',
      component: () => import('./views/CsvLabaRugiEksplorasi.vue'),
    },
    {
      path: '/csv-arus-kas-eksplorasi',
      name: 'csv-arus-kas-eksplorasi',
      component: () => import('./views/CsvArusKasEksplorasi.vue'),
    },
    {
      path: '/csv-investasi-eksplorasi',
      name: 'csv-investasi-eksplorasi',
      component: () => import('./views/CsvInvestasiEksplorasi.vue'),
    },
    {
      path: '/csv-penerimaan-negara-eksplorasi',
      name: 'csv-penerimaan-negara-eksplorasi',
      component: () => import('./views/CsvPenerimaanNegaraEksplorasi.vue'),
    },
    {
      path: '/csv-keuangan-lainnya-eksplorasi',
      name: 'csv-keuangan-lainnya-eksplorasi',
      component: () => import('./views/CsvKeuanganLainnyaEksplorasi.vue'),
    },
    {
      path: '/csv-anggaran-belanja-eksplorasi',
      name: 'csv-anggaran-belanja-eksplorasi',
      component: () => import('./views/CsvAnggaranBelanjaEksplorasi.vue'),
    },
    {
      path: '/csv-sumber-pembiayaan-eksplorasi',
      name: 'csv-sumber-pembiayaan-eksplorasi',
      component: () => import('./views/CsvSumberPembiayaanEksplorasi.vue'),
    },
    {
      path: '/csv-belanja-barang',
      name: 'csv-belanja-barang',
      component: () => import('./views/CsvBelanjaBarang.vue'),
    },
    {
      path: '/rekap-belanja-barang',
      name: 'rekap-belanja-barang',
      component: () => import('./views/RekapBelanjaBarang.vue'),
    },
    {
      path: '/file-manager-list',
      name: 'file-manager-list',
      component: FileManagerList,
    },
    {
      path: '/file-manager-cards',
      name: 'file-manager-cards',
      component: FileManagerCards,
    },
    {
      path: '/transaction-history',
      name: 'transaction-history',
      component: TransactionHistory,
    },
    {
      path: '/company-list',
      name: 'company-list',
      component: () => import('./views/CompanyList.vue'),
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
    },
    {
      path: '/header-navigation',
      name: 'header-navigation',
      meta: { layout: 'header-navigation' },
      component: HeaderNavigation,
    },
    {
      path: '/icon-sidebar-nav',
      name: 'icon-sidebar-nav',
      meta: { layout: 'icon-sidebar' },
      component: IconSidebarNav,
    }, 
    {
      path: '/not-admin',
      name: 'not-admin',
      meta: { layout: 'non-admin' },
      component: () => import('./views/NotAdmin.vue'),
    },
    {
      path: '/not-authenticated',
      name: 'not-authenticated',
      component: () => import('./views/NotAuthenticated.vue'),
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
