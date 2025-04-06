<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
      </div>
    </div>
    <div class="col-md-6">
      <h4>Organizations List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(organization, index) in organizations"
          :key="index"
          @click="setActiveOrganization(organization, index)"
        >
          {{ organization.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentOrganization">
        <h4>organization</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentOrganization.name }}
        </div>
        <div>
          <label><strong>Comment:</strong></label> {{ currentOrganization.comment }}
        </div>

        <router-link :to="'/organizations/' + currentOrganization.organization_id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service";

export default {
  name: "organizations-list",
  data() {
    return {
      organizations: [],
      currentOrganization: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveOrganizations() {
      service.getAll()
        .then(response => {
          this.organizations = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveOrganizations();
      this.currentOrganization = null;
      this.currentIndex = -1;
    },

    setActiveOrganization(organization, index) {
      this.currentOrganization = organization;
      this.currentIndex = organization ? index : -1;
    },

    removeAllOrganizations() {
      service.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchname() {
      service.findByName(this.name)
        .then(response => {
          this.organizations = response.data;
          this.setActiveOrganization(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveOrganizations();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>