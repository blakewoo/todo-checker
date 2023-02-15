const TODO_object = (function () {
    /**
     * TODO 객체 생성자
     * @param TODO_LIST : TODO_LIST
     * @param ID_HEAD : ID_HEAD
     * @constructor
     */
    function TODO_object (TODO_LIST,ID_HEAD) {
        let tempMap = new Map();
        for(let i=0;i<TODO_LIST.length;i++) {
            tempMap.set(TODO_LIST[i].ID,TODO_LIST[i].DATA)
        }
        this.TODO_Map = tempMap
        this.ID_Header = ID_HEAD
    }

    /**
     * TODO 추가
     * @param TODO_DATA
     * @returns {string|false}
     */
    TODO_object.prototype.addTodo = function (TODO_DATA) {
        let addId = this.ID_Header+"_"+new Date().getTime()

        // TODO 값 검증 루틴

        this.TODO_Map.set(addId,TODO_DATA);
        return addId
    }

    /**
     * TODO 변경
     * @param TODO_ID
     * @param TODO_DATA
     * @returns {boolean}
     */
    TODO_object.prototype.updateTodo = function (TODO_ID,TODO_DATA) {
        let result = true


        return result
    }

    /**
     * TODO 완료 처리
     * @param TODO_ID
     * @returns {boolean}
     */
    TODO_object.prototype.toggleTodoCompleted = function (TODO_ID) {
        let result = true


        return result
    }

    /**
     * TODO 삭제
     * @param TODO_ID
     * @returns {boolean}
     */
    TODO_object.prototype.deleteTodo = function (TODO_ID) {
        let result = true


        return result
    }
})