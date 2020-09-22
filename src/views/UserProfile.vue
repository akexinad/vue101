<template>
<div class="user-profile">
    <div class="user-profile__sidebar">
        <div class="user-profile__user-panel">
            <h1 class="user-profile__username">@{{ state.user.username }}</h1>
            <h2>{{ userId }}</h2>
            <div v-if="state.user.isAdmin" class="user-profile__admin-badge">Admin</div>
            <div class="user-profile__follower-count">
                <strong>Followers:</strong>
                {{ state.followers }}
            </div>

            <CreateTwootPanel @add-twoot="createNewTwoot" />

        </div>

        <div class="user-profile__twoots-wrapper">
            <h2>My Twoots</h2>
            <TwootItem v-for="twoot in state.user.twoots" :key="twoot.id" :username="state.user.username" :twoot="twoot" @favourite="toggleFavourite" />
        </div>
    </div>
</div>
</template>

<script>
import {
    reactive,
    watch,
    onMounted,
    computed
} from 'vue';
import {
    useRoute
} from "vue-router";

import {
    users
} from "../assets/users"
// import {
//     mockTwoots
// } from "../data/mockTwoots.js"

import TwootItem from "../components/TwootItem";

import CreateTwootPanel from "../components/CreateTwootPanel";

export default {
    name: "UserProfile",
    components: {
        TwootItem,
        CreateTwootPanel
    },
    setup() {
        const route = useRoute();
        const userId = computed(() => route.params.userId)

        const state = reactive({
            followers: 0,
            user: users[userId.value - 1] || users[0],
            // twoots: mockTwoots,
        })

        const createNewTwoot = (newTwootContent) => {
            return state.user.twoots.unshift({
                id: state.user.twoots.length + 1,
                content: newTwootContent
            })
        }

        const followUser = () => {
            state.followers++;
        }

        const toggleFavourite = (id) => {
            console.log(`Favourite tweet id is ${id}`)
        }

        const followers = watch(() => state.followers, (newFolCount, oldFolCount) => {
            if (oldFolCount < newFolCount) {
                console.log(`@${state.user.username} has gained a follower`);
            }
        })

        onMounted(() => followUser())

        return {
            state,
            createNewTwoot,
            toggleFavourite,
            followUser,
            followers,
            userId
        }
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
        border: 1px solid #DFE3E8;
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
    }

    .user-profile__twoots-wrapper {
        display: grid;
        grid-gap: 10px;
        margin-bottom: auto;
    }
}
</style>
