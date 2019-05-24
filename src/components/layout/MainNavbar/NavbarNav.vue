<template>
  <d-navbar-nav class="flex-row">
    <li class="nav-item border-left border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>
          <d-badge pill theme="danger">{{ notifications.length }}</d-badge>
        </div>
      </a>
      <d-collapse v-for="notification in notifications" key="notifications" id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item :href="notification.href">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div class="notification__content">
            <span class="notification__category">{{ notification.category }}</span>
            <p v-html="notification.description"></p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center">View all Notifications</d-dropdown-item>
      </d-collapse>
    </li>
    <li class="nav-item dropdown" v-if="!session">
      <router-link class="nav-link text-nowrap px-3" to="/login">Login</router-link>
    </li>
    <li class="nav-item dropdown" v-if="session">
      <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
        <img class="user-avatar rounded-circle mr-2" :src="avatarImg" alt="User Avatar"> <span class="d-none d-md-inline-block">{{session.fullname}}</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="user-profile"><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item>
        <d-dropdown-item to="edit-user-profile"><i class="material-icons">&#xE8B8;</i> Edit Profile</d-dropdown-item>
        <d-dropdown-item to="file-manager-list"><i class="material-icons">&#xE2C7;</i> Files</d-dropdown-item>
        <d-dropdown-item to="transaction-history"><i class="material-icons">&#xE896;</i> Transactions</d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item href="#" class="text-danger">
          <i class="material-icons text-danger">&#xE879;</i> <span v-on:click="logout">Logout</span>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';

export default {
  name: 'navbar-nav',
  data(){
    return {
      session: {},
      notifications: [],
      avatarImg: require('@/assets/images/uploads/' + this.$session.get('user').profile_picture + '.png'),
    }
  },

  created: function()
  {
      this.fetchSession();
      this.setNotification();
  },

  methods: {
    fetchSession() {
      this.session = this.$session.get('user');
    },
    setNotification() {
      if(this.session.status == "wait-profile") {
        var temp = {
          id: "notif_wait",
          category: "Profile",
          description: "You <span class='text-danger text-semibold'>haven't completed</span> your profile yet. Please complete your profile to access other content",
          href: "/admin/edit-user-profile",
        }
        this.notifications.push(temp);
      }
      else if(this.session.status == "active") {
        var temp = {
          id: "notif_active",
          category: "Profile",
          description: "Your profile is <span class='text-success text-semibold'>complete</span>, click here to upload CSV file",
          href: "/admin/importcsv",
        }
        this.notifications.push(temp);
      }
    },
    logout() {
      this.axios.get(address + ":3000/logout").then((response) => {
        alert("Successfully Logged Out");
        basicFunction.deleteAllCookies();
        localStorage.clear();
        this.$session.destroy();
        this.$router.push('/');
        location.reload();
      });
    }
  }
};
</script>

<style>
  .nav-link:hover {
    cursor: pointer;
  }

  /* IE11 Navbar flex fix. */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .navbar-nav {
      align-items: stretch !important;
      flex: 1 1 100%;
      flex-flow: row wrap;
    }

    .nav-item.notifications {
      margin-left: auto !important;
    }
  }
</style>