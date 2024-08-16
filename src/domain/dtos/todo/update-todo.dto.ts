import { create } from 'domain';
import { text } from 'stream/consumers';

export class UpdateTodoDto {

    constructor(
        public readonly id: string,
        public  readonly text: string,
        public readonly createAt: string
    ){
    }    

    get values() {
        const returnObj: {[key: string]: any} = {}

        if(this.id) returnObj.id = this.id;
        if(this.text) returnObj.text = this.text;
        if(this.createAt) returnObj.createAt = this.createAt;

        return returnObj;
    }

    static update( props: {[key: string]: any} ): [string?, UpdateTodoDto?] {
        const { id, text, createAt } = props; 

        if( !id || isNaN(Number(id)) ){
            return ['You id is not coerence']
        }

        let newCreateAt: Date = createAt;

        if( createAt ){
            newCreateAt = new Date(newCreateAt);
            if( newCreateAt.toString() === 'Invalid date' ){
                return ['You date is invalid'];
            }
        }

        return [undefined, new UpdateTodoDto( id, text, createAt )]
    }

}