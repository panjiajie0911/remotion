param([Parameter(Mandatory = $true)][string[]]$Paths)

Add-Type -AssemblyName System.Drawing

foreach ($path in $Paths) {
  $source = [System.Drawing.Bitmap]::FromFile($path)
  try {
    $bitmap = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.DrawImageUnscaled($source, 0, 0)
    $graphics.Dispose()

    $visited = New-Object 'bool[]' ($bitmap.Width * $bitmap.Height)
    $queue = New-Object 'System.Collections.Generic.Queue[int]'
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
      $queue.Enqueue($x)
      $queue.Enqueue((($bitmap.Height - 1) * $bitmap.Width) + $x)
    }
    for ($y = 0; $y -lt $bitmap.Height; $y++) {
      $queue.Enqueue($y * $bitmap.Width)
      $queue.Enqueue(($y * $bitmap.Width) + $bitmap.Width - 1)
    }

    while ($queue.Count -gt 0) {
      $index = $queue.Dequeue()
      if ($visited[$index]) { continue }
      $visited[$index] = $true
      $x = $index % $bitmap.Width
      $y = [math]::Floor($index / $bitmap.Width)
      $pixel = $bitmap.GetPixel($x, $y)
      $spread = [math]::Max($pixel.R, [math]::Max($pixel.G, $pixel.B)) - [math]::Min($pixel.R, [math]::Min($pixel.G, $pixel.B))
      if ($pixel.R -lt 225 -or $pixel.G -lt 225 -or $pixel.B -lt 225 -or $spread -gt 8) { continue }

      $bitmap.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
      if ($x -gt 0) { $queue.Enqueue($index - 1) }
      if ($x + 1 -lt $bitmap.Width) { $queue.Enqueue($index + 1) }
      if ($y -gt 0) { $queue.Enqueue($index - $bitmap.Width) }
      if ($y + 1 -lt $bitmap.Height) { $queue.Enqueue($index + $bitmap.Width) }
    }

    $output = [System.IO.Path]::Combine(
      [System.IO.Path]::GetDirectoryName($path),
      ([System.IO.Path]::GetFileNameWithoutExtension($path) + '-clean.png')
    )
    $bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
  } finally {
    $source.Dispose()
  }
}
