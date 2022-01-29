<template>
    <div id="errorRoute">
        <div class="error--inner">
            <strong>404 ERROR</strong>
            <h2>Looks like you are lost</h2>
            <p>The page you are looking for is not available</p>
            <button class="primary-btn-lg" @click="() => $router.push('/')">Go back home</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #errorRoute{
        min-height: 100vh;
        width: 100%;
        background-color: var(--primary-clr);
        display: grid;
        place-content: center;
        .error--inner{
            text-align: center;
            color: var(--white);
            strong{
                font-size: var(--font-size-x-large);
                color: #3296f9;
                text-transform: uppercase;
               
            }
            h2{
                margin-top: 1rem;
            }
        }
    }
</style>