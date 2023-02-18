const TODO = (function () {
    /**
     * TODO 객체 생성자
     * @param TODO_LIST : array
     * @param ID_HEAD : string
     * @constructor
     */
    function TODO (TODO_LIST,ID_HEAD,TODO_CONTAINER) {
        let tempMap = new Map();
        for(let i=0;i<TODO_LIST.length;i++) {
            tempMap.set(TODO_LIST[i].ID,TODO_LIST[i].DATA)
        }
        this.TODO_Map = tempMap
        this.ID_Header = ID_HEAD

        // 이후 프론트 엔드 병합시 사용
        this.TODO_CONTAINER = TODO_CONTAINER
    }

    /**
     * TODO 추가
     * @param TODO_OBJ : TODO_OBJECT
     * @returns {string|Boolean}
     */
    TODO.prototype.addTodo = function (TODO_OBJ) {
        let addId = this.ID_Header+"_"+new Date().getTime()

        // TODO 값 검증 루틴
        if(!TODO_OBJ.Value) {
            return false
        }
        TODO_OBJ.DeadLine = null
        TODO_OBJ.isCompleted = false
        TODO_OBJ.ID = addId

        this.TODO_Map.set(addId,TODO_OBJ);

        return addId
    }

    /**
     * TODO 변경
     * @param TODO_ID : string
     * @param TODO_OBJ : TODO_OBJECT
     * @returns {boolean}
     */
    TODO.prototype.updateTodo = function (TODO_ID,TODO_OBJ) {
        let result = true
        //front update
        this.TODO_Map.set(TODO_ID,TODO_OBJ)

        // back update

        return result
    }


    /**
     * TODO 전체 값 가져오기
     * @returns {TODO_OBJECT[]}
     */
    TODO.prototype.getAllTodo = function () {
        return Array.from(this.TODO_Map.values())
    }

    /**
     * TODO 값 가져오기
     * @param TODO_ID : string
     * @returns {TODO_OBJECT}
     */
    TODO.prototype.getTodo = function (TODO_ID) {
        return this.TODO_Map.get(TODO_ID)
    }

    /**
     * TODO 완료 처리
     * @param TODO_ID : string
     * @returns {boolean}
     */
    TODO.prototype.toggleTodoCompleted = function (TODO_ID) {
        let result = true
        //front update
        let temp = this.TODO_Map.get(TODO_ID)
        temp.isCompleted = true
        this.TODO_Map.set(TODO_ID,temp)

        // back update

        return result
    }

    /**
     * TODO 삭제
     * @param TODO_ID : string
     * @returns {boolean}
     */
    TODO.prototype.deleteTodo = function (TODO_ID) {
        let result = true
        // front update
        this.TODO_Map.delete(TODO_ID)

        // back update

        return result
    }
})

const TODO_OBJECT = (function () {
    /**
     * TODO 객체 초기화
     * @param Value
     * @param DeadLine
     * @param isCompleted
     * @constructor
     */
    function TODO_OBJECT (Value,DeadLine,isCompleted) {
        this.ID = null
        this.Value = Value;
        this.DeadLine = DeadLine
        this.isCompleted = isCompleted
    }
    return TODO_OBJECT
})