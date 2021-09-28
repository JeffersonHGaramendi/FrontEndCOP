<template>
  <v-row alogn="center" class="px-3 mx-auto">
    <v-col cols="12" md="4"><h1>Tournaments</h1></v-col>
    <v-col cols="12" md="8">
      <v-spacer></v-spacer>
      <v-text-field v-model="title" append-icon="mdi-magnify"
                    labe="Search by Title"
                    single-line hide-details></v-text-field>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-data-table :headers="headers" :items="tournaments" :search="title" sort-by="title">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Tournaments</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-widt0h="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Tournament</v-btn>
                </template>
                <!-- New or Edit Dialog -->
                <v-card>
                  <v-card-title>{{ formTitle }}</v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.title" label="Tournament Title"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.description" label="Tournament Description"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.startDate" label="Tournament Start"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="12">
                          <v-text-field v-model="editedItem.endDate" label="Tournament End"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close">Cancel</v-btn>
                    <v-btn color="primary" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--Delete Confirmation Dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title>Delete Tournament</v-card-title>
                  <v-card-text>Are you sure you want to delete this tournament?</v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="primary" @click="deleteItemConfirm">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ tournament }">
            <v-icon small class="mr-2" @click="editItem(tournament)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(tournament)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="retrieveTournaments">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import TournamentsService from '../services/tournaments.service'

export default {
  name: "tournaments",
  data: () => ({
    tournaments: [],
    title: '',
    headers: [
      {text: 'Id', value: 'id', sortable: true, align: 'end'},
      {text: 'Title', value: 'title', sortable: true, align: 'start'},
      {text: 'Description', value: 'description', sortable: false},
      {text: 'StartDate', value: 'startDate', sortable: true},
      {text: 'EndDate', value: 'endDate', sortable: true},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {id: 0, title: '', description: '', startDate: '', endDate: ''},
    //tournamentsStatus: ['Published', 'Pending']
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    }
  },
  watch: {

    dialog(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    getDisplayTournament(tournament) {
      return {
        id: tournament.id,
        title: tournament.title,
        description: tournament.description,
        startDate: tournament.startDate,
        endDate: tournament.endDate
      };
    },

    retrieveTournaments() {
      TournamentsService.getAll()
          .then((response) => {
            this.tournaments = response.data.map(this.getDisplayTournament);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          })
    },

    refreshList() {
      this.retrieveTournaments();
    },

    editTournament(id){
      // TODO: Implement external edit
      console.log(id);
    },

    deleteTournament(id){
      TournamentsService.delete(id)
          .then( () => {
            this.refreshList();
          })
          .catch( e => {
            console.log(e);
          });
    },

    editItem(item) {
      this.editedIndex = this.tournaments.indexOf(item);
      this.editedItem = Object.assign({},item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tournaments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // TODO: Implement item deletion
    },

    close(){
      this.dialog = false;
    },

    closeDelete(){
      this.dialogDelete = false;
    },

    save() {
      // TODO: Insert or Update item
    }
  },
  mounted() {
    this.retrieveTournaments();
  }
}
</script>

<style scoped>

</style>