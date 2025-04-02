<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="organization.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="organization.description"
          name="description"
        />
      </div>

      <button @click="saveOrganization" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrganization">Add</button>
    </div>
  </div>
</template>

<script>
import service from "../service";

export default {
  name: "add-organization",
  data() {
    return {
      organization: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveOrganization() {
      var data = {
        title: this.organization.title,
        description: this.organization.description
      };

      service.create(data)
        .then(response => {
          this.organization.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newOrganization() {
      this.submitted = false;
      this.organization = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>