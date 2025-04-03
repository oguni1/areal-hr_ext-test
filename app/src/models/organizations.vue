<template>
  <div v-if="currentOrganization" class="edit-form">
    <h4>Organization</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentOrganization.name"
        />
      </div>
      <div class="form-group">
        <label for="comment">Comment</label>
        <input type="text" class="form-control" id="comment"
          v-model="currentOrganization.comment"
        />
      </div>

    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteOrganization"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateOrganization"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Organization...</p>
  </div>
</template>

<script>
import service from "../service";

export default {
  name: "organization",
  data() {
    return {
      currentOrganization: null,
      message: ''
    };
  },
  methods: {
    getOrganization(organization_id) {
      service.get(organization_id)
        .then(response => {
          this.currentOrganization = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },


    updateOrganization() {
      service.update(this.currentOrganization.organization_id, this.currentOrganization)
        .then(response => {
          console.log(response.data);
          this.message = 'The organization was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteOrganization() {
      service.delete(this.currentOrganization.organization_id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "organizations" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getOrganization(this.$route.params.organization_id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>