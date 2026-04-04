$port = 8124
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()

Write-Host "Servidor rodando em http://localhost:$port/"
$baseDir = (Get-Location).Path

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $path = [System.Uri]::UnescapeDataString($path)
        $fullPath = Join-Path -Path $baseDir -ChildPath $path.TrimStart('/')
        
        if (Test-Path $fullPath) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length
            
            if ($fullPath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($fullPath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($fullPath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
    }
}
