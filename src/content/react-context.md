
## The Problem with Props

Props provide a way to directly pass information into React components. This does have it's drawbacks. For example - say we have a configuration object which comes in via an API in the top-level of our app. We can sometimes get into a situation where we don't use a prop in one component and it's only there so it can be passed to it's children. This is what is referred to as 'prop-drilling', where props go through multiple levels of nesting just to be passed to another component.

```jsx
const App = ({ config }) => {
    return (
        <Layout>
            <Header config={config} />
            <ContactForm config={config} />
        </Layout>
    )
}

const Header = ({ config }) => {
    return (
        <HeaderItem config={config} />
        <HeaderItem config={config} />
        <HeaderItem config={config} />
    )
}

const ContactForm = ({ config }) => {
    return (
        <TextInput config={config} />
        <DateInput config={config} />
    )
}
```

We can see how this has greatly cluttered the code. This is a minimal example with no other props, but as a code-base grows and grows prop lists can become harder and harder to read.

## Clarification with Context

Context lets us create a 'global' store for a tree of React components. This is achieved through providers and selectors. First, we must create a context and wrap any elements we wish to have access to the context in a provider.

```jsx
import { createContext } from 'react';

const ConfigurationContext = createContext(null);

const App = ({ config }) => {
    return (
        <ConfigurationContext.Provider value={config}>
            <Layout>
                <Header />
                <ContactForm />
            </Layout>
        </ConfigurationContext.Provider>
    )
}
```

So, we've wrapped our app in a provider, and you may have also noticed we've removed the config props from `Header` and `ContactForm`. So, how do they get access to the config they require? Well, we could pull the config in through the `useContext` hook in `Header`, but as the prop isn't actually used in `Header`, it's just passed through. We can do this instead.

```jsx
const Header = () => {
    return (
        <HeaderItem />
        <HeaderItem />
        <HeaderItem />
    )
}

const HeaderItem = () => {
    const config = useContext(ConfigurationContext);

    return <>...</>
}

```

We've now successfully reduced prop-drilling in this example, but we can still improve how we use our new context. It's possible for users to try to use our context outside of the umbrella of our provider. In this case, the configuration returned will always be undefined as we don't have a provider setting the value. To prevent this we can write a small custom hook to test if we get a value back, and if not we throw an error.

```jsx
const useConfiguration = () => {
    const config = useContext(ConfigurationContext);

    if (!config) throw new Error("Configuration context can only be called from within it's provider.");
    
    return config;
}

const HeaderItem = () => {
    const config = useConfiguration();

    return <Header>...</Header>
}
```

## Other Use-Cases for Context

### Managing Application State

While the main benefit of context is the reduction in prop-drilling, it can also be quite useful for managing application state.

For example, say we had some state at the top level of our application for managing how many times a button was clicked.

```jsx
import { createContext } from 'react';

const CounterContext = createContext(null);

const App = ({ user }) => {
    const [count, setCount] = useState(0);

    const ctx = {
        count,
        setCount,
    };

    return (
        <CounterContext.Provider value={ctx}>
            <Layout>
                <Content />
            </Layout>
        </CounterContext.Provider>
    );
};
```
We can now access both the value and the setter function for a piece of state, anywhere below our provider.

This can be especially powerful when combined with `useReducer` as we can essentially have a global store similar to those which libraries such as Redux provide.

### Theming

A very common use-case is managing application styles through theming. Lots of sites now come with a dark-mode toggle which can be much easier to manage if you have a singular global state which selects which theme the site should use. Imagine having to pass a theme to every component that needs it via props!

### Routing

Routing is another common use-case, but it's often dealt with by third-party libraries. Most will come with some kind of hook for getting details about the current route, e.g. `useRouter`.
