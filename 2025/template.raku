my $file = 'DayX.txt';
if $file.IO.e {
    my $content = $file.IO.slurp;
    say $content;
} else {
    say "File not found.";
}
