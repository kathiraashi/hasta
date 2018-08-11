import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as d3 from 'd3';

@Component({
    selector: 'app-machine-status-crm-customers-view',
    templateUrl: './machine-status-crm-customers-view.component.html',
    styleUrls: ['./machine-status-crm-customers-view.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MachineStatusCrmCustomersViewComponent implements OnInit {

    @Input() CustomerData: Object;

    Company_Id = '5b3c66d01dd3ff14589602fe';
    User_Id = '5b3c7268f838b31bc89e7c8c';

    Loader: Boolean = true;

    _List: any[] = [];

    bsModalRef: BsModalRef;


    // ******************
    private dimensions: Array<string>;
    // ##################


    constructor(
        private modalService: BsModalService
    ) { }

    ngOnInit() {
        this.Loader = false;

        // ******************
        this.drawChart();
        // #################
    }

    drawChart() {
        const data = [
            { name: 'cats', count: 10, percentage: '2.06 Hrs', color: '#bad5f1' },
            { name: 'dogs', count: 20, percentage: '5.10 Hrs', color: '#f8b70a' },
            { name: 'horses', count: 30, percentage: '8.00 Hrs', color: '#6149c6' },
            { name: 'goats', count: 40, percentage: '10.40Hrs', color: '#9f8170' },
        ];
        const totalCount = '24 Hrs'; // calculating total manually

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const width = 300,
            height = 300,
            radius = width / 2;

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(100);

        const pie = d3.pie().sort(null)
            .value(function (d) { return d.count; });

        // const tips = d3Tip()
        //     .attr('class', 'd3-tip')
        //     .offset([-10, 0])
        //     .html(function(d) {
        //         return '<strong>Frequency:</strong> <span style='color:red'>' + d.percentage + '</span>';
        //     });

        const tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .html('<strong>Frequency:</strong> <span style="color:red"> 3.00 Hrs</span>');

        const svg = d3.select('#chart').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


        const g = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .on('mouseover', function (p) {
                return tooltip
                .html('<strong>Frequency:</strong> <span style="color:red">' + p.data.percentage + '</span>')
                .style('visibility', 'visible');
            })
            .on('mousemove', function () { return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px'); })
            .on('mouseout', function () { return tooltip.style('visibility', 'hidden'); });

        g.append('path')
            .attr('d', arc)
            .style('fill', function (d) { return d.data.color; })
            .on('mouseover', function (d) {
                d3.select(this)
                    .style('cursor', 'pointer')
                    .style('fill', 'gray');
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .style('cursor', 'none')
                    .style('fill', function (c) { return c.data.color; });
            });

        g.append('text')
            .attr('transform', function (d) {
                const _d = arc.centroid(d);
                _d[0] *= 1;	// multiply by a constant factor
                _d[1] *= 1;	// multiply by a constant factor
                return 'translate(' + _d + ')';
            })
            .attr('dy', '14px')
            .style('text-anchor', 'middle')
            .text(function (d) {
                return d.data.count + '%';
            });

        g.append('text')
            .attr('class', 'Overall-group')
            .attr('text-anchor', 'middle')
            .attr('font-size', '25px')
            .attr('y', 20)
            .text(totalCount);

    }

}
