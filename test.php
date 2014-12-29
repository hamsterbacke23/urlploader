<?php

$urls = array(
    'http://domain.com/a/a.jsp',
    'http://domain.com/a/b/a.jsp',
    'http://domain.com/a/b/b.jsp',
    'http://domain.com/a/b/c.jsp',
    'http://domain.com/a/c/1.jsp',
    'http://domain.com/a/d/2.jsp',
    'http://domain.com/a/d/a/2.jsp'
);

$array = array();

foreach ($urls as $url)
{
    $url = str_replace('http://', '', $url);
    $parts = explode('/', $url);

    krsort($parts);

    $line_array = null;
    $part_count = count($parts);

    foreach ($parts as $key => $value)
    {
        if ($line_array == null)
        {
            $line_array = array($value => $value);
        }
        else
        {
            $line_array = array($value => $line_array);
        }
    }

    $array = array_merge_recursive($array, $line_array);
}

echo '<pre class="debug-me" style="color:#666; width:500px; font-size:11px; white-space: pre-wrap;">';
echo '($array): ';
var_dump($array);
echo '</pre>';
exit;


?>