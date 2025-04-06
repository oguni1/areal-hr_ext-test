<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="organization.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="comment">Comment</label>
        <input
          class="form-control"
          id="comment"
          required
          v-model="organization.comment"
          name="comment"
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
        organization_id: null,
        name: "",
        comment: ""
      },
      submitted: false
    };
  },
  methods: {
    saveOrganization() {
      var data = {
        name: this.organization.name,
        comment: this.organization.comment
      };

      service.create(data)
        .then(response => {
          this.organization.organization_id = response.data.organization_id;
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