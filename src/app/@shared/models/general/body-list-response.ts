export class BodyListResponse<key_type> {
    data: key_type[];
    size: number;

    constructor(data: key_type[],
        size: number) {
        this.data = data;
        this.size = size
    }
    getLLenadoTamano() {
        this.size = this.data.length;
    }
}
