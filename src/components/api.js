export default {

    "data": [
        {
            "sender": false,
            "msg": "hello1",
            "options": {"hasContent": false},
            "Serial": 1
        },
        {
            "sender": false,
            "msg": "hello2",
            "options": {"hasContent": false},
            "Serial": 2
        },
        {
            "sender": true,
            "msg": "hello3",
            "options": {"hasContent": false},
            "Serial": 3
        },
        {
            "sender": false,
            "msg": "hello4",
            "options": {"hasContent": false},
            "Serial": 4
        },
        {
            "sender": true,
            "msg": "hello5",
            "options": {"hasContent": false},
            "Serial": 5
        },

        //  1: Button
        //  2: List
        //  3: Image Gallery

        {
            sender: false,
            setting: {
                dialogType: 1,
                replyType: 1
            },

            hasPrompt: true,
            prompt: {
                promptType: 1,
                prompt_index: 1,
                prompt_content: "hello6",
            },

            hasOptions: true,
            options: {
                optionAttributes: null,
                array: [
                    {
                        option: "Chose One",
                        index: 1
                    },
                    {
                        option: "Chose Two",
                        index: 2
                    },
                    {
                        option: "Chose Three",
                        index: 3
                    }
                ]
            },
            serial: 16
        },











        // List Option
        {
            sender: false,
            setting: {
                dialogType: 1,
                replyType: 1
            },

            hasPrompt: true,
            prompt: {
                promptType: 1,
                prompt_index: 1,
                prompt_content: "hello6",
            },

            hasOptions: true,
            options: {
                optionType: 3,
                optionAttributes: ["Name", "Calories"],
                array: [["Green Salad", 100],["Blue salad", 98],["Kale Salad", 185]]
            },
            serial: 16
        },







    ]


}
