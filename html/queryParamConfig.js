queryParamConfig = {
    "ssrDebug": {
        query: {
            'ssrDebug': true,
            'suppressbi': true
        }
    },
    "forceBolt": {
        query: {
            'petri_ovr': 'specs.EnableThunderboltRenderer:false',
            'ssrDebug': undefined
        },
        options: {
            newTab: true
        }
    },
    "excludeSSR": {
        query: {
            'petri_ovr': 'specs.ExcludeSiteFromSsr:true',
        }
    },
    "ThunderboltGA": {
        query: {
            'petri_ovr': 'specs.RolloutThunderboltFleet:GA',
            'debug': 'false'
        }
    },
    "ThunderboltCanary": {
        query: {
            'petri_ovr': 'specs.RolloutThunderboltFleet:Canary',
            'debug': 'false'
        }
    },
    "DeployPreview": {
        query: {
            'thunderboltTag': () => '________',
        }
    },
    "SuricateTunnelId": {
        query: {
            'SuricateTunnelId': 'gileck._wix-thunderbolt-app',
            'ssrDebug': true
        }
    },
    "SSR ONLY": {
        query: {
            'ssrOnly': true
        }
    },
    "DS local": {
        query: {
            'petri_ovr':'specs.UseTBAsMainRScript:true',
            'viewerSource':'https://localhost:4200',
            'disableAutoSave': 'true'
        }
    },
    "dumpSiteModel": {
        query: {
            "dumpSiteModel": true
        }
    },
    "debug": {
        query: {
            "debug": true
        }
    },
    "Performance Tool": {
        query: {
            "performanceTool": true
        }
    },
    "disableBiLoggerBatch": {
        query: {
            "disableBiLoggerBatch": true
        }
    },
    "forceReport": {
        query: {
            "forceReport": true
        }
    },
    "sampleEvents": {
        query: {
            "sampleEvents": true
        }
    },
    "disableSiteAssetsCache": {
        query: {
            "disableSiteAssetsCache": true
        }
    },
    "ssrIndicator": {
        query: {
            "ssrIndicator": true
        }
    }
}