import http from '@/core/http-common'
class TournamentsService {
    endPoint = '/tournaments';

    getAll(){
        return http.get(this.endPoint)
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createTournamentDto){
        return http.post(this.endPoint,createTournamentDto);
    }

    update(id,updateTournamentDto){
        return http.put(`${this.endPoint}/${id}`,updateTournamentDto);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`);
    }

    findByTitle(title) {
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new TournamentsService();