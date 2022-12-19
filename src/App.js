import MyRoutes from './Routes';
import MainContextProvider from './contexts/MainContext';

function App() {
    return (
        <>
            <MainContextProvider>
                <MyRoutes />
            </MainContextProvider>
        </>
    );
}

export default App;
