<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Dashboard</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Simple high-contrast terminal theme */
        body {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            background-color: #000000; /* Pure Black */
            color: #00ff00; /* Classic Green Terminal Text */
        }
        .simple-border {
            border: 2px solid #00ff00;
        }
    </style>
</head>
<body class="p-4 md:p-8 min-h-screen">

    <div class="max-w-3xl mx-auto space-y-6">

        <!-- Header Block -->
        <div class="text-center p-4 simple-border">
            <h1 class="text-3xl font-bold text-white uppercase tracking-wider">
                [SYSTEM STATUS: ONLINE]
            </h1>
            <p class="text-sm mt-1 text-green-400">
                PHP CONTAINER MODULE V1.0
            </p>
        </div>

        <!-- Project Info Card (What has been done) -->
        <div class="p-4 simple-border">
            <h2 class="text-xl font-bold mb-2 text-white">DEPLOYMENT REPORT</h2>
            <p class="text-sm mb-4">
                This system hosts an **PHP container-based application** compiled for optimized deployment. The process utilized a **multi-stage build approach** to achieve minimal disk utilization and security.
            </p>

            <div class="grid grid-cols-2 gap-4 text-xs">
                <div>
                    <span class="font-bold text-green-400">PLATFORM:</span> PHP 8
                </div>
                <div>
                    <span class="font-bold text-green-400">BUILD STRATEGY:</span> Self-Contained Multi-Stage
                </div>
                <div>
                    <span class="font-bold text-green-400">FINAL IMAGE:</span> php:8.3-fpm-alpine
                </div>
                <div>
                    <span class="font-bold text-green-400">AUTHOR:</span> Moshrekul Islam
                </div>
                <!-- New GitHub Source Link -->
                <div class="col-span-2 mt-2">
                    <span class="font-bold text-green-400">SOURCE REPO:</span> 
                    <a href="https://github.com/mirakib/DevOps-Projects/tree/main/Docker/PHP%20Static%20Frontend%20Application" class="underline text-green-400 hover:text-green-200" target="_blank">View on GitHub</a>
                </div>
            </div>
        </div>

        <!-- Static Network Status Component (Showing IP and Port) -->
        <div class="p-4 simple-border">
            <h2 class="text-xl font-bold mb-2 text-white">NETWORK STATUS</h2>
            <p class="text-sm text-green-400">
                &gt; CONNECTION ESTABLISHED
            </p>
            <div class="grid grid-cols-2 gap-4 text-sm mt-2">
                <div>
                    <span class="font-bold text-green-500">CONTAINER IP:</span> <span class="text-white">172.17.0.2</span>
                </div>
                <div>
                    <span class="font-bold text-green-500">HOST PORT:</span> <span class="text-white">8080</span>
                </div>
            </div>
        </div>

        <!-- Static Footer/Status Component -->
        <div class="text-center pt-4">
            <p class="text-sm text-green-500 font-bold tracking-widest">
                &gt; DEPLOYMENT COMPLETES AT [2025-10-12 00:44:00]
            </p>
        </div>
    </div>

</body>
</html>
