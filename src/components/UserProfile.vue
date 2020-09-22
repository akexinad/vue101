<template>
<div class="user-profile">
    <div class="user-profile__sidebar">
        <div class="user-profile__user-panel">
            <h1 class="user-profile__username">@{{ user.username }}</h1>
            <div v-if="user.isAdmin" class="user-profile__admin-badge">Admin</div>
            <div class="user-profile__follower-count">
                <strong>Followers:</strong>
                {{ followers }}
            </div>

            <CreateTwootPanel @add-twoot="createNewTwoot" />

        </div>

        <div class="user-profile__twoots-wrapper">
            <h2>My Twoots</h2>
            <TwootItem v-for="twoot in user.twoots" :key="twoot.id" :username="user.username" :twoot="twoot" @favourite="toggleFavourite" />
        </div>
    </div>
</div>
</template>

<script>
import TwootItem from "./TwootItem";
import CreateTwootPanel from "./CreateTwootPanel";

export default {
    name: "UserProfile",
    components: {
        TwootItem,
        CreateTwootPanel
    },
    data() {
        return {

            followers: 0,
            user: {
                id: 1,
                username: "_fedefel",
                firstName: "federico",
                lastName: "fellini",
                email: "fellini@ex.it",
                isAdmin: true,
                twoots: [{
                        id: 1,
                        content: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
                    },
                    {
                        id: 2,
                        content: "Fusce consequat. Nulla nisl. Nunc nisl.",
                    },
                    {
                        id: 3,
                        content: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                    },
                    {
                        id: 4,
                        content: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
                    }
                ],
            },
        };
    },
    watch: {
        followers(newFolCount, oldFolCount) {
            if (oldFolCount < newFolCount) {
                console.log(`@${this.user.username} has gained a follower`);
            }
        },
    },
    methods: {
        followUser() {
            this.followers++;
        },
        toggleFavourite(id) {
            console.log(`Favourite tweet id is ${id}`)
        },
        createNewTwoot(newTwootContent) {
            this.user.twoots.unshift({
                id: this.user.twoots.length + 1,
                content: newTwootContent
            })
        }
    },
    mounted() {
        this.followUser();
    },
};
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 50px;
    padding: 50px 5%;

    .user-profile__user-panel {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #dfe3e8;
        margin-bottom: auto;

        h1 {
            margin: 0;
        }

        .user-profile__admin-badge {
            background: rebeccapurple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            font-weight: bold;
        }

        .user-profile__create-twoot {
            padding-top: 20px;
            display: flex;
            flex-direction: column;

            &.--exceeded {
                color: red;
                border-color: red;
            }
        }
    }

    .user-profile__twoots-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-bottom: auto;
    }
}
</style>
