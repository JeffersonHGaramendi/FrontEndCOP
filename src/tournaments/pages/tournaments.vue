<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "tournaments",
  data: () => ({
    tournaments: [],
    title: '',
    headers: [
      {text: 'Id', value: 'id', sortable: true, align: 'end'},
      {text: 'Title', value: 'title', sortable: true, align: 'start'},
      {text: 'Description', value: 'description', sortable: false},
      {text: 'Status', value: 'status', sortable: true},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {id: 0, title: '', description: '', status: ''},
    tournamentsStatus: ['Published', 'Pending']
  }),
}
</script>

<style scoped>

</style>