class Mock {

    constructor() {
        let count = 0;
        setInterval(() => {
            this.onmessage('hello world' + count);
            count++;
        }, 10000);
    }

    send(data) {
        // 随机延迟
        const delay = Math.random() * 1000;
        setTimeout(() => {
            switch (data) {
                case 'hello':
                    this.onmessage('world');
                    break;

                case 'world':
                    this.onmessage('hello');
                    break;

                case '你好':
                    // 随机是否返回
                    if (Math.random() > 0.5) {
                        this.onmessage('好个der');
                    }
                    break;

                default:
                    this.onmessage(data);
                    break;
            }
        }, delay);
    }

    onmessage = (data) => {
    }
}
