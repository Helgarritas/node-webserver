
export class CreateTodoDto {

    constructor(
        public readonly text: string
    ){
    }    

    static create( props: {[key: string]: any} ): [string?, CreateTodoDto?] {
        const { text } = props; 
        if( !text ) return [ 'Need you a text to continue', new CreateTodoDto(text)]
        
        return ['', new CreateTodoDto(text) ];
    }

}