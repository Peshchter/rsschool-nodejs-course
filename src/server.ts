import {config} from './common/config';

import {app} from './app';
import {TryDBConnect} from "./helpers/db";

TryDBConnect(
    () => {
        app.listen(config.PORT, () =>
            console.log(`App is running on http://localhost:${config.PORT}`)
        );
    }
)


