#!/usr/bin/perl

use strict;
use warnings;

=description

data.pl
Transforms CSV food/season/state data into JSON.

=cut

my $inFile = "SI649-FinalProject-Data.csv";
my $outFile = "inseason.js";

my @states = (
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
);

my @months = (
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
);

open(IN, $inFile);
open(OUT, ">", $outFile);

print OUT "var data = [\n";

my @csv = <IN>;

foreach my $state (@states) {

    print OUT "{\n";
    print OUT "\t'state': '", $state, "',\n";
    print OUT "\t'months':\n";
    print OUT "\t[\n";
    
    for (my $i = 0; $i <= $#months; $i++) {
        
        my $month = $months[$i];
        my $monthCellIdx = $i + 2;
        
        print OUT "\t\t{\n";
        print OUT "\t\t\t'month': '", $month, "',\n";
        print OUT "\t\t\t'foods':\n";
        print OUT "\t\t\t[\n";
        
        my $firstFoodObj = 1;
        
        foreach (@csv[1..$#csv]) {
            
            my @row = split(/,/);
            
            # 0: food
            # 1: colors
            # 2: january states
            # 3: february states
            # 4: march states
            # 5: april states
            # 6: may states
            # 7: june states
            # 8: july states
            # 9: august states
            # 10: september states
            # 11: october states
            # 12: november states
            # 13: december states
            
            # Check to see if this item is contained in this month for this state
            if ($row[$monthCellIdx] =~ /$state/) {
                
                if (!$firstFoodObj) {
                    print OUT ",\n";
                }
                
                print OUT "\t\t\t\t{\n";
                print OUT "\t\t\t\t\t'food': '", $row[0], "',\n";
                # Stub for nutrition info
                print OUT "\t\t\t\t\t'nutrition': {},\n";
                print OUT "\t\t\t\t\t'colors': ['", join('\',\'', split(/;/, $row[1])), "']\n";

                # End food object
                print OUT "\t\t\t\t}";
                
                $firstFoodObj = 0;
            }
        }
        
        # End foods array
        print OUT "\n\t\t\t]\n";
        # End month object
        if ($month eq $months[$#months]) {
            print OUT "\t\t}\n";
        }
        else {
            print OUT "\t\t},\n";
        }
    }
    
    # End months array
    print OUT "\t]\n";
    # End state object
    if ($state eq $states[$#states]) {
        print OUT "}\n";
    }
    else {
        print OUT "},\n";
    }
}

print OUT "];";

close(IN);
close(OUT);
